import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import PostModel from "../models/Post.model.js";
import UserModel from "./../models/User.model.js";
import localLogger from "../utils/localLogger.js";

// get single post
export const getPost = asyncHandler(async (req, res, next) => {
  try {
    let postId = req.params.postId;
    // console.log("postId -", postId);

    const post = await PostModel.findById({ _id: postId });

    if (!post)
      return res.status(404).json({
        status: "failed",
        message: "No record found.",
      });

    post &&
      res.status(201).json({
        status: "success",
        message: "Post fetched successfully",
        post,
      });
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// get all posts by user
export const getPosts = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const { q } = req.query;

    let posts = await PostModel.find({ user: userId });
    if (posts.length < 1)
      return res.status(200).json({
        status: "failed",
        message: "No posts yet",
      });

    if (q) {
      const searchQuery = q.toLowerCase();
      posts = posts.filter((post) => {
        const { author, title, body } = post;
        return (
          author.toLowerCase().includes(searchQuery) ||
          title.toLowerCase().includes(searchQuery) ||
          body.toLowerCase().includes(searchQuery)
        );
      });
    }

    res.status(200).json(posts.slice(0, 100));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// create post
export const createPost = asyncHandler(async (req, res, next) => {
  try {
    const { title, body, image } = req.body;
    const userId = req.userId;
    const user = await UserModel.findById(userId);

    let newPost = await PostModel({
      user: user._id,
      author: user.username,
      title,
      body,
      // image:,
    });

    try {
      let savedPost = await newPost.save();

      res.status(200).json({
        status: "success",
        message: "New post created!",
        savedPost,
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// update post
export const updatePost = asyncHandler(async (req, res, next) => {
  try {
    let postId = req.params.postId;
    const userId = req.userId;
    let { title, body } = req.body;

    let foundPost = await PostModel.findOne({ _id: postId, user: userId });

    if (!foundPost)
      return res.status(404).json({
        status: "failed",
        message: "Record not found.",
      });

    if (foundPost.user.toString() !== userId.toString())
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized. You can only update your own post.",
      });

    try {
      let updatedPost = await PostModel.findByIdAndUpdate(postId, {
        title,
        body,
      });

      res.status(200).json({
        status: "success",
        message: "Post updated.",
        updatedPost,
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// delete a post
export const deletePost = asyncHandler(async (req, res, next) => {
  try {
    let postId = req.params.postId;
    const userId = req.userId;

    let foundPost = await PostModel.findOne({ _id: postId, user: userId });

    if (!foundPost)
      return res.status(404).json({
        status: "failed",
        message: "Record not found.",
      });

    if (foundPost.user.toString() !== userId.toString())
      return res.status(403).json({
        status: "failed",
        message: "Unauthorized. You can only delete your own post.",
      });

    try {
      await PostModel.findByIdAndDelete({ _id: postId, user: userId });

      res.status(200).json({
        status: "success",
        message: "Post deleted.",
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});

// delete all posts by user
export const deletePosts = asyncHandler(async (req, res, next) => {
  try {
    const userId = req.userId;

    let foundPosts = await PostModel.find({ user: userId });

    if (!foundPosts)
      return res.status(404).json({
        status: "failed",
        message: "Record not found.",
      });

    try {
      await PostModel.deleteMany({ user: userId });

      res.status(200).json({
        status: "failed",
        message: "All your posts have been deleted.",
      });
    } catch (err) {
      localLogger.error(err.message);
      console.log(err.message);

      return res.status(400).json({
        status: "failed",
        message: "Error ocurred.",
      });
    }
  } catch (error) {
    localLogger.error(error.message);
    console.log(error.message);

    return res.status(500).json({
      status: "failed",
      message: "Something went wrong.",
    });
  }
});
