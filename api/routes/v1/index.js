import express from "express";
// import v1 routes
import authRoutes from "./auth.routes.js";
import profileRoutes from "./user.routes.js";
import postRoutes from "./post.routes.js";
import { authenticateAccessToken } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", authenticateAccessToken, profileRoutes);
router.use("/posts", authenticateAccessToken, postRoutes);

export default router;
