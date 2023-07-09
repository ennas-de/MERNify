import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";
import {
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "../../../utils/token.utils";
import axios from "axios";

// Thunk action to handle user register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { firstname, lastname, username, email, password, confirmPassword },
    { rejectWithValue }
  ) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API}/auth/register`,
        { firstname, lastname, username, email, password, confirmPassword },
        config
      );

      return response.data;
    } catch (error) {
      // console.log("registerUser error - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle user login
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ loginDetail, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(
        `${API}/auth/login`,
        { loginDetail, password },
        config
      );

      // console.log("loginUser - ", response.data);

      const { accessToken, refreshToken } = response.data;

      // Store access token and refresh token in local storage
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);


      return response.data;
    } catch (error) {
      // console.log("loginUser error - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle user refreshToken
export const fetchAccessToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { rejectWithValue }) => {
    try {
      const refresh_token = localStorage.getItem("refreshToken");
      // console.log(refresh_token);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Refreshtoken: `RefreshToken ${refresh_token}`,
        },
      };

      const response = await axios.post(`${API}/auth/refreshtoken`, config);

      const { accessToken, refreshToken } = response.data;

      // Store access token in local storage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      return response.data;
    } catch (error) {
      console.log("fetchRefreshtoken error - ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk action to handle user initial profile load action
export const fetchUserProfile = createAsyncThunk(
  "auth/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      let accessToken = getAccessToken();

      // console.log(accessToken);

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(`${API}/auth/profile`, config);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
