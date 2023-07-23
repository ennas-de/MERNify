import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import { deleteUser, getUser } from "../../../redux/features/user/userActions";
import { logout } from "../../../redux/features/auth/authSlice";


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
          {/* <p>Loading profile...</p> */}
        </div>
      ) : (
        <div className="auth-bg !mt-9">
          <h2 className="auth-heading !capitalize pb-5">Your Profile</h2>
          {userProfile && (
            <div key={userProfile._id} className="user-profile">
            <p><span className="profile-label">Firstname:</span> <span className="value capitalize">{userProfile.firstname}</span></p>
            <p><span className="profile-label">Lastname:</span> <span className="value capitalize">{userProfile.lastname}</span></p>
            <p><span className="profile-label">Username:</span> <span className="value">{userProfile.username}</span></p>
            <p><span className="profile-label">Email:</span> <span className="value">{userProfile.email}</span></p>
            <p><span className="profile-label">Role:</span> <span className="value">{userProfile.role}</span></p>
          </div>
          )}
          <div className="mt-9 flex justify-between">
            <Link className="button" to={dynamicPath}>
              EditProfile
            </Link>
            <button className="" onClick={handleDeleteProfile}>
              Delete Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
