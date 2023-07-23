import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";
import { persistor } from "./../../../redux/app/store";
// import { GiHamburgerMenu } from 'react-icons/gi'
// import { useState } from "react";


const Navbar = () => {
  // const [nav, setNav] = useState(false)
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    persistor.purge();
    dispatch(logout());

    navigate("/user/login");
  };
  console.log('page');
  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <div className="navbar-logo">MERNify</div>
          {/* <div className="block md:hidden" onClick={() => setNav(!nav)}>
            <GiHamburgerMenu size={20}/>
          </div> */}
          <div className="nav-elements">
            <ul>
              <li >
                <NavLink to={`/`}>Home</NavLink>
              </li>
              <li >
                <NavLink to={`/dashboard/posts/:userId`}>Posts</NavLink>
              </li>
              <li >
                <NavLink to={`/dashboard/profile/:userId`}>Profile</NavLink>
              </li>
              <li>
                <div className="navbar__extra">
                  {user && (
                    <Link to="/" onClick={handleLogout}>
                      Log out
                    </Link>
                  )}
                </div>
              </li>
            </ul>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Navbar;
