import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, Link } from "react-router-dom";
import { createPost } from "../../../redux/features/post/postActions";


const AddPost = () => {
  // hooks
  const dispatch = useDispatch();

  // local state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  const { status, message, loading } = useSelector((state) => state.post);

  useEffect(() => {
    if (status === "success" && message === "New post created!") {
      window.location.replace(`/dashboard/posts/${userId}`);
    }
  }, [status, message]);

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
        <div className="auth-bg !mt-20">
          <h2 className="auth-heading">Add New Post</h2>

          <div>
            <form
              onSubmit={handleCreatePost}
              style={{ alignItems: "center" }}
              className="mt-4">
                <span className="label">title</span>
              <input
                type="text"
                name="title"
                value={title}
                className="input mb-4 !mt-2"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title..."
              />
              <span className="label">content</span>
              <input
                type="text"
                name="body"
                value={body}
                className="input mb-4 !mt-2"
                onChange={(e) => setBody(e.target.value)}
                placeholder="Enter some contents..."
              />
              <br />

              <div className="flex justify-between items-center">
                <button className="button">Create Post</button>
                <div className="">
                  <Link to={`${postPath}/${userId}`} >Go to Posts</Link>
                </div>
              </div>
            </form>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default AddPost;
