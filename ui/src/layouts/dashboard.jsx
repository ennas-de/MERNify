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
    <div className="h-screen">
      <header className="topnav">
        <Navbar routes={dashRoutes} />
      </header>

      <main className="content overflow-y-scroll">
        <Outlet />
      </main>

      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default Dashboard;
