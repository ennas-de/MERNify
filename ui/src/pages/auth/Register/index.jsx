import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../../../redux/features/auth/authActions";

import "./Register.css";

const Register = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state ( firstname, lastname, username, email, password, confirmPassword)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // get state variables
  const { error, message, status, Loading } = useSelector(
    (state) => state.auth
  );

  // page redirects depending on user presence
  const access_token = localStorage.getItem("accessToken");
  const refresh_token = localStorage.getItem("refreshToken");

  // display notifications depending on the type (success or failure)
  useEffect(() => {
    if (error && message && status === "failed") {
      toast.error(message);
    } else if (
      !error &&
      message === "Registration successful" &&
      status === "successful"
    ) {
      toast.success(message);
      navigate("/user/login");
    }
  }, [error, status, message]);

  // form function
  const handleRegister = async (e) => {
    e.preventDefault();

    console.log({
      firstname,
      lastname,
      username,
      email,
      password,
      confirmPassword,
    });

    try {
      dispatch(
        registerUser({
          firstname,
          lastname,
          username,
          email,
          password,
          confirmPassword,
        })
      );

      console.log(`Register request sent to server...`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleRegister} className="mt-9">
        <input
          type="text"
          value={firstname}
          placeholder="firstname..."
          name={firstname}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <br />

        <input
          type="text"
          value={lastname}
          placeholder="lastname..."
          name={lastname}
          onChange={(e) => setLastname(e.target.value)}
        />
        <br />

        <input
          type="text"
          value={username}
          placeholder="username..."
          name={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />

        <input
          type="email"
          value={email}
          placeholder="email..."
          name={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <input
          type="password"
          value={password}
          placeholder="password..."
          name={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input
          type="password"
          value={confirmPassword}
          placeholder="confirmPassword..."
          name={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <button className="mt-2">Register</button>
      </form>
      <p className="mt-2">
        Already a member? <Link to="/user/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
