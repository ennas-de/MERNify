import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";

import "./Navbar.css";

const Navbar = ({ routes }) => {
  const params = useParams(); // Get the route parameters
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    persistor.purge();
    dispatch(logout());

    window.location.replace("/user/login");
  };
  return (
    <>
      <div className="navbar">
        <div>MERNify</div>
        {routes.map(({ title, layout, pages }, key) => (
          <ul key={key}>
            {pages.map(({ name, path }) => {
              const dynamicPath = path.replace(
                ":userid",
                params.userId || user._id
              );
              return (
                <li key={name}>
                  <NavLink to={`/${layout}${dynamicPath}`}>{name}</NavLink>
                </li>
              );
            })}
          </ul>
        ))}
        <div>
          {user && (
            <Link to="/" onClick={handleLogout}>
              Log out
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
