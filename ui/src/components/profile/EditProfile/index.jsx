import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "../../../redux/features/user/userActions";
import { Link, generatePath } from "react-router-dom";


const EditProfile = () => {
  // hooks
  const dispatch = useDispatch();

  // local state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  // load auth state
  const { user } = useSelector((state) => state.auth);
  // console.log("user ", user);

  const userid = user._id;
  // console.log(userid);

  // fetch user profile
  useEffect(() => {
    dispatch(getUser(userid));
  }, [dispatch, userid]);

  // fetch profile data
  const { userProfile, loading, error, message, status } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    if (status === "success" && message === "Profile updated successfully") {
      window.location.replace(`/dashboard/profile/${userid}`);
    }
  }, [status, message]);

  useEffect(() => {
    if (userProfile) {
      setFirstname(userProfile.firstname);
      setLastname(userProfile.lastname);
      setUsername(userProfile.username);
      setEmail(userProfile.email);
    }
  }, [error]);

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const data = { firstname, lastname, username, email };
    dispatch(updateUser(data));
    console.log("Updating Profile");
  };

  const profilePath = generatePath(`/dashboard/profile/${userid}`); // Generate the profile path

  return (
    <div>
      {loading ? (
        <div>
          {/* <p>Loading profile...</p> */}
        </div>
      ) : (
        <div className="auth-bg !mt-9">
          <h2 className="auth-heading !capitalize pb-5">Update your details</h2>
          <form onSubmit={handleUpdateUser}>
            <span className="label">firstname</span>
            <input
              type="text"
              name="firstname"
              value={firstname}
              className="input mb-4 !mt-2"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <span className="label">lastname</span>
            <input
              type="text"
              name="lastname"
              value={lastname}
              className="input mb-4 !mt-2"
              onChange={(e) => setLastname(e.target.value)}
            />
            <span className="label">username</span>
            <input
              type="text"
              name="username"
              value={username}
              className="input mb-4 !mt-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="label">email</span>
            <input
              type="email"
              name="email"
              value={email}
              className="input mb-4 !mt-2"
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex justify-between items-center pt-2">
              <button className="button">Update Profile</button>
              <Link to={profilePath}>Go back to Profile</Link>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
