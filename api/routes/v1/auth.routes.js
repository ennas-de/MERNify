// routes/auth.js
import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  refreshToken,
  fetchUserProfile,
} from "../../controllers/auth.controller.js";
import {
  authenticateAccessToken,
  refreshAccessToken,
} from "../../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refreshtoken/", refreshAccessToken, refreshToken);
router.get("/profile", authenticateAccessToken, fetchUserProfile);

export default router;
