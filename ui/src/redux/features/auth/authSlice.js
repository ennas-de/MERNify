import { createSlice } from "@reduxjs/toolkit";
import {
  registerUser,
  loginUser,
  fetchAccessToken,
  fetchUserProfile,
} from "./authActions";
import { PURGE } from "redux-persist";

const initialState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  status: "",
  message: "",
  loading: false,
  error: false,
};

// Load the persisted state from local storage if available
const persistedState = JSON.parse(localStorage.getItem("persist:root"));
const updatedInitialState = {
  ...initialState,
  ...persistedState?.auth, // Use persisted profile state if available
};

const authSlice = createSlice({
  name: "auth",
  initialState: updatedInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.status = "";
      state.message = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(fetchAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchAccessToken.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(fetchAccessToken.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(PURGE, () => {
        return initialState;
      });
  },
});

export const { logout, clearMessage } = authSlice.actions;
export default authSlice.reducer;
