// models/User.model.js
import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      minLength: [2, "First name must be at least 2 characters long"],
      maxLength: [12, "First name must not be more than 12 characters long"],
    },
    lastname: {
      type: String,
      required: true,
      minLength: [2, "Last name must be at least 2 characters long"],
      maxLength: [12, "Last name must not be more than 12 characters long"],
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username must be unique"],
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Email address must be unique "],
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admins", "editor", "contributor", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
