import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import { updatePost, getPost } from "../../../redux/features/post/postActions";

import "./EditPost.css";

const EditPost = () => {
  // hooks
  const dispatch = useDispatch();

  // get post id from params
  let params = useParams();
  const postId = params.postId;

  // local state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // fetch post data
  useEffect(() => {
    dispatch(getPost(postId));
  }, [dispatch, postId]);

  const { user } = useSelector((state) => state.auth);
  const userId = user._id;

  // fetch post data
  const { post, loading, error, status, message } = useSelector(
    (state) => state.post
  );

  console.log(post);

  useEffect(() => {
    if (status === "success" && message === "Post updated.") {
      window.location.replace(`/dashboard/posts/${userId}`);
    }
  }, [status, message]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleUpdatePost = (e) => {
    e.preventDefault();

    console.log(postId);
    dispatch(updatePost({ postId, title, body }));
    console.log("Updating post");
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
          {post && (
            <div>
              <form
                onSubmit={handleUpdatePost}
                style={{ alignItems: "center" }}
                className="mt-4">
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <br />
                <input
                  type="text"
                  name="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
                <br />

                <button className="mt-2">Update Post</button>
              </form>
              <div className="mt-9">
                <Link to={`${postPath}/${userId}`}>Posts</Link>
              </div>
            </div>
            // </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditPost;
