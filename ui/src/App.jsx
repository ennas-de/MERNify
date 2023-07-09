// App.jsx

import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; //toast.success/error
import "./App.css";
import Auth from "./layouts/auth";
import Dashboard from "./layouts/dashboard";

import ProtectedRoutes from "./utils/routing/ProtectedRoutes";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import EditProfile from "./components/profile/Edit";
import Post from "./pages/dashboard/Post";
import EditPost from "./components/post/Edit";
import AddPost from "./components/post/Add";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }>
          <Route path="" element={<Home />} />
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="posts/:userId" element={<Post />} />
          <Route path="posts/edit/:postId" element={<EditPost />} />
          <Route path="posts/add" element={<AddPost />} />
        </Route>

        <Route path="/user/*" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        <Route
          path="*"
          element={
            <ProtectedRoutes>
              <Dashboard />
            </ProtectedRoutes>
          }>
          <Route path="" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
