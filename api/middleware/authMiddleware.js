// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import localLogger from "../utils/localLogger.js";

// Middleware to verify the access token and authenticate the user
const authenticateAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const accessToken = authHeader && authHeader.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json({
        status: "failed",
        message: "Access token not found",
      });
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET,
      (err, user) => {
        if (err) {
          return res.status(401).json({
            status: "failed",
            message: "Invalid access token.",
          });
        }

        // console.log(user);

        if (!user)
          return res.status(401).json({
            status: "failed",
            message: "Please log in first",
          });

        req.userId = user.userId;

        next();
      }
    );
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

// Middleware to verify the refresh token and generate a new access token
const refreshAccessToken = async (req, res, next) => {
  try {
    // console.log(req);

    const refreshHeader = req.body.headers.Refreshtoken;
    const refreshToken = refreshHeader && refreshHeader.split(" ")[1];
    if (!refreshToken) {
      localLogger.error("Refresh token not found");

      return res.status(401).json({
        status: "failed",
        message: "User not authenticated. Please log in.",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    // console.log(decoded);

    if (!decoded) {
      localLogger.error("RefreshToken expired.");
      return res.status(401).json({
        status: "failed",
        message: "Session expired. Please login",
      });
    }

    req.userId = decoded.userId;

    next();
  } catch (error) {
    localLogger.error(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong",
    });
  }
};

const isAdmin = async (req, res, next) => {
  const user = await UserModel.findOne({ _id: req.userId });
  // Check if the user is an admin
  if (user.role === "admin") {
    next(); // User is authorized, continue to the next middleware or route handler
  } else {
    localLogger.error("User not an admin");
    res.status(403).json({
      status: "failed",
      message: "You are not authorized to access this resource",
    });
  }
};

export { authenticateAccessToken, refreshAccessToken, isAdmin };
