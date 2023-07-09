// models/Post.model.js
import mongoose from "mongoose";
import validator from "validator";

const postSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Author is required"],
    },
    // this is included so we can filter the table based on the post author
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    title: {
      type: String,
      required: true,
      minLength: [2, "Post title must be at least 2 characters long"],
      maxLength: [100, "Only 100 characters length are allowed right now."],
      unique: [true, "Similar post already exist."],
    },
    body: {
      type: String,
      required: true,
      minLength: [2, "Post title must be at least 2 characters long"],
      maxLength: [600, "Only 600 characters length are allowed right now."],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
