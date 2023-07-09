import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import {
  fetchAccessToken,
  fetchUserProfile,
  loginUser,
} from "../../../redux/features/auth/authActions";
import { getAccessToken, getRefreshToken } from "../../../utils/token.utils";

import "./Login.css";

const Login = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state
  const [loginDetail, setLoginDetail] = useState("");
  const [password, setPassword] = useState("");

  // get state variables
  const { error, message, accessToken, status, Loading, user } = useSelector(
    (state) => state.auth
  );

  // used to fetch user profile if there is accessToken stored in the localStorage
  let access_token;
  let refresh_token;

  // default functions
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    } else {
      // check if user tokens are in localStorage
      access_token = getAccessToken();
      refresh_token = getRefreshToken();

      if (access_token) {
        dispatch(fetchUserProfile());
      }
      // if no accessToken in the state, but there is refreshToken in the localStorage
      if (!accessToken || !user) {
        if (refresh_token) {
          dispatch(fetchAccessToken());
        }
      }
    }
  }, [user, accessToken, access_token, refresh_token, navigate]);

  // display notifications depending on the type (success or failure)
  useEffect(() => {
    if (error && message && status === "failed") {
      toast.error(message);
    } else if (
      !error &&
      message === "Login successful" &&
      status === "successful"
    ) {
      toast.success(message);
      navigate("/");
    }
  }, [error, status, message, navigate]);

  // form function
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginUser({ loginDetail, password }));

      console.log(`Log in request sent to server...`);
    } catch (error) {}
  };

  return (
    <div>
      <form onSubmit={handleLogin} className="mt-9">
        <input
          type="text"
          value={loginDetail}
          placeholder="username or email..."
          onChange={(e) => setLoginDetail(e.target.value)}
        />
        <br />

        <input
          type="password"
          value={password}
          placeholder="password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button>Login</button>
      </form>
      <p className="mt-2">
        No yet a member? <Link to="/user/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
