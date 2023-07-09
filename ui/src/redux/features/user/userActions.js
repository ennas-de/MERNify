import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import axios from "axios";

// Thunk action to handle fetching User data
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userid = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.get(`${API}/user/${userid}`, config);

      return response.data;
    } catch (error) {
      console.log("getUser err - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle fetching multiple Users data
export const getUsers = createAsyncThunk(
  "user/getUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(`${API}/user/${userId}`, config);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle Updating User data
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const userId = auth.user._id; // Access the userId from the auth state

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      // console.log(data);

      const response = await axios.patch(
        `${API}/user/${userId}`,
        { data },
        config
      );

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle deleting a single user data
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(`${API}/user/`, config);

      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log("error -", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle deleting multiple users data
export const deleteUsers = createAsyncThunk(
  "user/deleteUsers",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.delete(`${API}/user/`, config);

      //   const { user} = response.data;

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);
