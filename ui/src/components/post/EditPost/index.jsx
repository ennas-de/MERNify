import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { generatePath, useParams, Link } from "react-router-dom";
import { updatePost, getPost } from "../../../redux/features/post/postActions";


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
        <div className="auth-bg !mt-20">
          <h2 className="heading">Edit Post</h2>
          {post && (
            <div>
              <form
                onSubmit={handleUpdatePost}
                style={{ alignItems: "center" }}
                className="mt-4">
                  <span className="label">title</span>
                <input
                  type="text"
                  name="title"
                  value={title}
                  className="input mb-4 !mt-2"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <span className="label">content</span>
                <input
                  type="text"
                  name="body"
                  value={body}
                  className="input mb-4 !mt-2"
                  onChange={(e) => setBody(e.target.value)}
                />
                <br />

                <div className="flex justify-between items-center">
                <button className="button">Update Post</button>
                <div>
                  <Link to={`${postPath}/${userId}`}>Go to Posts</Link>
                </div>  
                </div>
              </form>
            </div>
            // </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EditPost;
