// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import asyncHandler from "express-async-handler";

import UserModel from "../models/User.model.js";
import localLogger from "../utils/localLogger.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "./../utils/tokenUtils.js";

const registerUser = asyncHandler(async (req, res, next) => {
  try {
    const { firstname, lastname, username, email, password, confirmPassword } =
      req.body;

    // validate
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({
    //     status: "failed",
    //     message: errors.array(),
    //   });
    // }
    // console.log(errors);

    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({
        status: "failed",
        message: "Please fill all fields",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Passwords do not match",
      });
    }

    // Check if the user already exist
    let existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        status: "failed",
        message: "Email already exist. Please log in",
      });
    }
    let existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({
        status: "failed",
        message: "Username already exist. Please log in",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new UserModel({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      status: "successful",
      message: "Registration successful",
    });
  } catch (error) {
    localLogger.error(error.message);
    console.error(error.message);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  try {
    const { loginDetail } = req.body;

    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: "failed",
        message: errors.array(),
      });
    }

    // Check if the user exist
    let foundUser;
    foundUser = await UserModel.findOne({ email: loginDetail });
    if (!foundUser)
      foundUser = await UserModel.findOne({ username: loginDetail });
    if (!foundUser) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    // Validate the password
    const validPassword = await bcrypt.compare(
      req.body.password,
      foundUser.password
    );
    if (!validPassword) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    // Generate tokens
    const accessToken = generateAccessToken(foundUser._id);
    const refreshToken = generateRefreshToken(foundUser._id);

    // Store refresh token in user document
    foundUser.refreshToken = refreshToken;
    await foundUser.save();

    const { password, ...others } = foundUser._doc;

    res.status(200).json({
      status: "successful",
      message: "Login successful",
      user: others,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "failed",
      message: "Server Error",
    });
  }
});

const refreshToken = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById(userId).select("-password");

    if (!user) {
      localLogger.error("refresh token verification failed");

      return res.status(401).json({
        status: "failed",
        message: "Please  login first.",
      });
    }

    // Generate new access token
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.status(200).json({
      status: "success",
      message: "New access token generated",
      accessToken,
      refreshToken,
      user,
    });
  } catch (error) {
    localLogger.error(error.message);
    res.status(500).json({
      status: "falied",
      message: "Something went wrong",
    });
  }
});

const fetchUserProfile = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;

    // find the user by ID
    const user = await UserModel.findById({ _id: userId });

    const { password, ...others } = user._doc;

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "Profile not found",
      });
    }

    if (user) {
      // Re-generate new tokens
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      return res.status(201).json({
        status: "success",
        message: "Profile fetching successful",
        accessToken,
        refreshToken,
        user: others,
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
});

export { registerUser, loginUser, refreshToken, fetchUserProfile };
