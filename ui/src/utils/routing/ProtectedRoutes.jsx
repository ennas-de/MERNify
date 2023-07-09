import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  useEffect(() => {
    if (!user) window.location.replace("/user/login");
  }, [user]);

  return <React.Fragment>{user ? props.children : null}</React.Fragment>;
};
export default ProtectedRoute;
