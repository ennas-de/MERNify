import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import { deleteUser, getUser } from "../../../redux/features/user/userActions";
import { logout } from "../../../redux/features/auth/authSlice";

import "./Profile.css";

const Profile = () => {
  // hooks
  const dispatch = useDispatch();
  // const history = useHistory();

  // load auth state
  const { user } = useSelector((state) => state.auth);
  let userid;
  let params = useParams();
  userid = params.userId;

  // fetch user profile
  useEffect(() => {
    dispatch(getUser(userid));
  }, [dispatch, userid]);

  // fetch new profile data
  const { userProfile, loading, error } = useSelector((state) => state.user);

  const handleDeleteProfile = () => {
    dispatch(deleteUser());
    dispatch(logout());
  };

  const dynamicPath = generatePath(`/dashboard/profile/edit`); // Generate the dynamic path

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading profile...</p>
        </div>
      ) : (
        <div>
          <h2 className="heading">Profile Component</h2>
          {userProfile && (
            <div key={userProfile._id} className="mt-2">
              <h3>Firstname: {userProfile.firstname}</h3>
              <p>Lastname: {userProfile.lastname}</p>
              <p>Username: {userProfile.username}</p>
              <p>Email: {userProfile.email}</p>
              <p>Role: {userProfile.role}</p>
            </div>
          )}
          <div className="mt-9">
            <Link className="button" to={dynamicPath}>
              EditProfile
            </Link>
            <button className="button" onClick={handleDeleteProfile}>
              DeleteProfile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
