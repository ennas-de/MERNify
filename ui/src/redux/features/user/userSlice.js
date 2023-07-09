// redux/features/profile/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getUser,
  getUsers,
  updateUser,
  deleteUsers,
  deleteUser,
} from "./userActions";
import { PURGE } from "redux-persist";

const initialState = {
  users: [],
  userProfile: null,
  status: "",
  message: "",
  loading: false,
  error: null,
};

// Load the persisted state from local storage if available
const persistedState = JSON.parse(localStorage.getItem("persist:root"));
const updatedInitialState = {
  ...initialState,
  ...persistedState?.profile, // Use persisted profile state if available
};

const userSlice = createSlice({
  name: "user",
  initialState: updatedInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.userProfile = action.payload.user;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.users = action.payload.users;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.userProfile = action.payload.user;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.users = [];
        state.userProfile = null;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        console.log(action.payload);

        state.loading = false;
        state.error = true;
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.loading = true;
        state.error = false;
        state.message = "";
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.users = [];
        state.status = action.payload.status;
        state.message = action.payload.message;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
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

export const { clearMessage } = userSlice.actions;

export default userSlice.reducer;
