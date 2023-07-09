// redux/features/profile/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  deletePosts,
} from "./postActions";

const initialState = {
  posts: [],
  post: null,
  status: "",
  message: "",
  loading: false,
  error: null,
};

// Load the persisted state from local storage if available
const persistedState = JSON.parse(localStorage.getItem("persist:root"));
const updatedInitialState = {
  ...initialState,
  ...persistedState?.post, // Use persisted profile state if available
};

const postSlice = createSlice({
  name: "user",
  initialState: updatedInitialState,
  reducers: {
    updatePostList: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.post = action.payload.post;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.posts = action.payload;
        // state.status = action.payload.status;
        // state.message = action.payload.message;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.post = action.payload.post;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updatePost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.posts = action.payload.post;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deletePosts.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.posts = [];
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deletePosts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      });
  },
});

export const { updatePostList } = postSlice.actions;

export default postSlice.reducer;
