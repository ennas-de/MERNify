import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { createPost } from "../../../redux/features/post/postActions";

import "./AddPost.css";

const AddPost = () => {
  // hooks
  const dispatch = useDispatch();

  // local state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const { status, message, error, loading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (status === "success" && message === "New post created!") {
      window.location.replace(`/dashboard/posts/${userId}`);
    }
  }, [status, message]);

  useEffect(() => {
    if (error && message !== "") {
      toast.error(message);
    }
    if (status && message !== "") {
      toast.success(message);
    }
  }, [error, status, message]);

  const handleCreatePost = (e) => {
    e.preventDefault();

    console.log(title, body);
    dispatch(createPost({ title, body }));
    console.log("Creating post");
  };

  const postPath = generatePath(`/dashboard/posts/`); // Generate the dynamic path

  return (
    <div>
      {loading ? (
        <div>
          <p>Loading posts...</p>
        </div>
      ) : (
        <div>
          <h2>EditPost Component</h2>

          <div>
            <form
              onSubmit={handleCreatePost}
              style={{ alignItems: "center" }}
              className="mt-4">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
              />
              <br />
              <input
                type="text"
                name="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter some contents..."
              />
              <br />

              <button className="mt-3">Create Post</button>
            </form>
            <div className="mt-9">
              <Link to={`${postPath}/${userId}`}>Posts</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
