import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";

import "./Navbar.css";

const Navbar = ({ routes }) => {
  const params = useParams(); // Get the route parameters
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        {routes.map(({ title, layout, pages }, key) => (
          <React.Fragment key={key}>
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
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Navbar;
