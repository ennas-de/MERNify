import asyncHandler from "express-async-handler";
import UserModel from "../models/User.model.js";
import PostModel from "../models/Post.model.js";
import localLogger from "../utils/localLogger.js";

// CRUD

// GET ONE
export const getUser = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.params);

    const userId = req.userId;

    // find the user by ID
    const user = await UserModel.findById({ _id: userId });

    // console.log(user);
    const { password, ...others } = user._doc;

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User fetching failed",
      });
    }

    if (user) {
      return res.status(201).json({
        status: "success",
        message: "User fetching successful",
        user: others,
      });
    }
  } catch (error) {
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something else went wrong",
    });
  }
});

// GET ALL
export const getUsers = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;

    const user = await UserModel.findById({ _id: userId });

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized. You need higher permisions to do that",
      });
    }

    if (isAdmin) {
      // find the user by ID
      const users = await UserModel.find().select("-password");

      if (users.length < 1) {
        return res.status(404).json({
          status: "failed",
          message: "No records found",
        });
      }

      if (users.length >= 1) {
        return res.status(201).json({
          status: "success",
          message: "fetching Users successful",
          users,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something else went wrong",
    });
  }
});

// UPDATE
export const updateUser = asyncHandler(async (req, res, next) => {
  try {
    // console.log(req.body);
    // console.log(req.userId);

    const userId = req.userId;
    const { data } = req.body;

    const foundUser = await UserModel.findOne({ _id: userId });
    // console.log(foundUser);

    if (userId.toString() !== foundUser._id.toString()) {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized. Only update your account",
      });
    }
    try {
      // Find the user by ID and update
      const user = await UserModel.findByIdAndUpdate(userId, data, {
        new: true,
      });

      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "User not found",
        });
      }
      // console.log(user);

      if (user) {
        const { password, ...others } = user._doc;
        return res.status(201).json({
          status: "success",
          message: "Profile updated successfully",
          user: others,
        });
      }
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Please use unique values for both Username and Email fields.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.error(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
});

// DELETE ONE
export const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;
    console.log("deleteUser");

    // find the user by ID
    const user = await UserModel.findById({ _id: userId });

    if (!user) {
      console.log("No user found");

      return res.status(404).json({
        status: "failed",
        message: "Account not found",
      });
    }

    if (userId.toString() !== user._id.toString()) {
      console.error("Unauthorized. You don't have permission to do that.");

      return res.status(404).json({
        status: "failed",
        message: "Unauthorized. You don't have permission to do that.",
      });
    }

    if (userId.toString() === user._id.toString()) {
      // find user by ID and delete
      await UserModel.findByIdAndDelete({ _id: userId });
      await PostModel.deleteMany({ user: userId });

      return res.status(201).json({
        status: "success",
        message: "Account deleted successfully",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    return res.status(500).json({
      status: "failed",
      message: "Something else went wrong",
    });
  }
});

// DELETE ALL
export const deleteUsers = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    const isAdmin = user.role === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized. You don't have the permission to do that",
      });
    }

    if (isAdmin) {
      // find user by ID and delete
      await UserModel.deleteMany();

      return res.status(200).json({
        status: "success",
        message: "User Accounts deleted successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Something else went wrong",
    });
  }
});
