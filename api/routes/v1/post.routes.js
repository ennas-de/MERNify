import express from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deletePosts,
} from "../../controllers/post.controller.js";

const router = express.Router();

router.get("/:userId", getPosts);
router.post("/:userId", createPost);
router.get("/:userId/:postId", getPost);
router.patch("/:userId/:postId", updatePost);
router.delete("/:userId/:postId", deletePost);
router.delete("/:userId", deletePosts);

export default router;
