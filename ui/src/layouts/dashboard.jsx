import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../widgets/layout/Navbar";
import Footer from "../widgets/layout/Footer";
import {
  fetchAccessToken,
  fetchUserProfile,
} from "../redux/features/auth/authActions";
import routes from "../utils/routes";
// import { logout } from "../redux/features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();

  const { user, accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!accessToken) {
      dispatch(fetchAccessToken());
    }
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [user, accessToken, dispatch]);

  let dashRoutes = routes.filter((route) => route.layout === "dashboard");

  return (
    <div>
      <Navbar routes={dashRoutes} />

      <div className="mt-9">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
