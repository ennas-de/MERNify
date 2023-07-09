import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import axios from "axios";
import { updatePostList } from "./postSlice";

// Thunk action to handle fetching Post data
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (postId, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user._id;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      const response = await axios.get(
        `${API}/posts/${userId}/${postId}`,
        config
      );

      return response.data;
    } catch (error) {
      console.log("getPost err - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle fetching multiple Posts data
export const getPosts = createAsyncThunk(
  "posts/getPosts",
  async (payload, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const { userId, searchQuery } = payload;

      console.log(userId);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      let url = `${API}/posts/${userId}`;

      if (searchQuery) {
        url += `?q=${searchQuery}`;
        console.log(url);
      }

      // console.log(url);

      const response = await axios.get(url, config);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle Updating Post data
export const createPost = createAsyncThunk(
  "posts/createPost",
  async ({ title, body }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      // console.log(data);

      const response = await axios.post(
        `${API}/posts/${userId}`,
        { title, body },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle Updating Post data
export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async ({ postId, title, body }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      console.log(postId);

      const response = await axios.patch(
        `${API}/posts/${userId}/${postId}`,
        { title, body },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle deleting Post data
export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postId, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth, post } = getState();
      const userId = auth.user._id;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      const response = await axios.delete(
        `${API}/posts/${userId}/${postId}`,
        config
      );

      // Update the local state or dispatch the action to update the post list
      const updatedPosts = post.posts.filter((p) => p._id !== postId);
      dispatch(updatePostList(updatedPosts));

      return response;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
  {
    rejectValue: (error) => {
      console.log(error);
      if (error.message) {
        return error.message;
      } else {
        return "Something went wrong.";
      }
    },
  }
);

// Thunk action to handle deleting multiple Post data
export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
      };

      const response = await axios.delete(`${API}/post/`, config);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
