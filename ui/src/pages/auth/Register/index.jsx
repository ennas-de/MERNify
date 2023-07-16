import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { registerUser } from "../../../redux/features/auth/authActions";
import { clearMessage } from "../../../redux/features/auth/authSlice";


const Register = () => {
  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // local state ( firstname, lastname, username, email, password, confirmPassword)
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // get state variables
  const { error, message, status, Loading } = useSelector(
    (state) => state.auth
  );

  // display notifications depending on the type (success or failure)
  useEffect(() => {
    if (error && message && status === "failed") {
      toast.error(message);
    } else if (
      !error &&
      message === "Registration successful" &&
      status === "successful"
    ) {
      toast.success(message);
      const hasRedirected = localStorage.getItem("hasRedirected");
      if (!hasRedirected) {
        navigate("/user/login");
        localStorage.setItem("hasRedirected", true);
      }
    }

    return () => {
      dispatch(clearMessage());
    };
  }, [dispatch, error, status, message]);

  // form function
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      dispatch(
        registerUser({
          firstname,
          lastname,
          username,
          email,
          password,
          confirmPassword,
        })
      );

      console.log(`Register request sent to server...`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-bg">
        <h2 className="auth-heading">Register</h2>
        <form onSubmit={handleRegister} className="mt-9">
          <span className="label">Firstname</span>
          <input
            type="text"
            value={firstname}
            className="input mb-6 !mt-2"
            placeholder="firstname..."
            name={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          
          <span className="label">Lastname</span>
          <input
            type="text"
            value={lastname}
            className="input mb-6 !mt-2"
            placeholder="lastname..."
            name={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          
          <span className="label">USERNAME</span>
          <input
            type="text"
            value={username}
            className="input mb-6 !mt-2"
            placeholder="username..."
            name={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          
          <span className="label">EMAIL</span>
          <input
            type="email"
            value={email}
            className="input mb-6 !mt-2"
            placeholder="email..."
            name={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <span className="label">Password</span>
          <input
            type="password"
            value={password}
            className="input mb-6 !mt-2"
            placeholder="password..."
            name={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <span className="label">Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            className="input mb-6 !mt-2"
            placeholder="confirm password..."
            name={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          
          <p className="auth-question">
            Already a member? <Link to="/user/login">Login</Link>
          </p>

          <button className="button">Register</button>
        </form>
        
      </div>
    </div>
  );
};

export default Register;
