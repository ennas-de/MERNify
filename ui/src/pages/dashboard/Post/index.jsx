import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { deletePost, getPosts } from "../../../redux/features/post/postActions";
import { clearMessage } from "../../../redux/features/auth/authSlice";

import "./Post.css";

const Post = () => {
  // hooks
  const dispatch = useDispatch();
  const params = useParams();

  // local state
  const [searchQuery, setSearchQuery] = useState("");

  const userId = params.userId;

  useEffect(() => {
    dispatch(getPosts({ userId, searchQuery }));
  }, [dispatch, userId, searchQuery]);

  const { posts, loading, error, status, message } = useSelector(
    (state) => state.post
  );

  // display notifications depending on the type (success or failure)
  useEffect(() => {
    if (error && message && status === "failed" && message !== "No posts yet") {
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

  const handleSearch = () => {
    dispatch(getPosts({ userId, searchQuery }))
      .unwrap()
      .then(() => {
        console.log("Posts fetched");
        toast.success("Posts fetched");
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        // Handle error if fetch request fails
      });
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePost(postId))
      .unwrap()
      .then((deletedPostId) => {
        console.log("Post deleted:", deletedPostId);
        toast.success("Post deleted");

        // Fetch the updated posts after successful deletion
        dispatch(getPosts({ userId, searchQuery }))
          .unwrap()
          .then(() => {
            console.log("Posts fetched");
          })
          .catch((error) => {
            console.error("Error fetching posts:", error);
          });
      })
      .catch((error) => {
        if (error.payload) {
          console.error("Error deleting post:", error.payload);
        } else {
          console.error("Error deleting post:", error);
        }
        // Handle error if delete request fails
      });
  };

  const formatPostedDate = (dateString) => {
    const dateObj = new Date(dateString);
    const formattedDate = dateObj.toLocaleDateString();
    const formattedTime = dateObj.toLocaleTimeString();
    return formattedDate + " " + formattedTime;
  };

  return (
    <div className="w-[70%] mx-auto">
      <h2 className="auth-heading mt-2">Your Posts</h2>
      <div className="mb-4 auth-bg !p-8 !bg-transparent !w-[800px]">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          className="input outline"
          onChange={handleInputChange}
        />
        <button className="button my-3" onClick={handleSearch}>
          Search
        </button>
        <Link className="button" to="/dashboard/posts/add">
        Add New Post
      </Link>
      </div>
      
      <hr className="mt-5" />
      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="mt-4">No posts found.</p>
      ) : (
        // <p>posts</p>
        posts.map((post) => (
          <div key={post._id} className="mt-5 post-card bg-gray-50">
            <div className="mt-2">
              <h3 className="text-3xl font-bold">{post.title}</h3>
              <p>{post.body}</p>
              <p className="text-gray-700 text-sm mt-4">Author: {post.author}</p>
              <p className="text-gray-700 text-sm">Date Posted: {formatPostedDate(post.createdAt)}</p>
            </div>
            <div className="mt-3 mb-3 flex gap-3 items-center pt-2 !border-0">
              <Link className="button" to={`/dashboard/posts/edit/${post._id}`}>
                Edit Post
              </Link>
              <button
                className=""
                onClick={() => handleDeletePost(post._id)}>
                Delete Post
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Post;
