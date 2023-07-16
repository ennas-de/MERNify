import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate, useParams } from "react-router-dom";
import { logout } from "../../../redux/features/auth/authSlice";
import { persistor } from "./../../../redux/app/store";


const Navbar = ({ routes }) => {
  const params = useParams(); // Get the route parameters
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
          <div className="navbar-logo">MERN<span>ify</span></div>
          <div className="nav-elements">
            {routes.map(({ layout, pages }, key) => (
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
          </div>
          <div className="navbar__extra">
            {user && (
              <Link to="/" onClick={handleLogout}>
                Log out
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
