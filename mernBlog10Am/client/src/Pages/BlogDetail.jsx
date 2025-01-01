import React, { useEffect, useState } from "react";
import moment from "moment";
import CommentSection from "../components/CommentSection";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function BlogDetail() {
  const { postId } = useParams();
  const [posts, setposts] = useState([]);


  const getAllBlogData = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/post/getpost?limit=10`, {
        withCredentials: true,
      })
      .then((res) => {
        
        // filter the posts based on postId
        const filteredPosts = res.data.posts.filter(
          (post) => post._id === postId
        );
        setposts(filteredPosts);
        toast.success(res?.data?.message);
      })
      .catch((err) => {
      
        toast.error(err?.response?.data?.error);
      });
  };

  useEffect(() => {
    getAllBlogData();
  }, []);
  return (
    <div className="container my-4">
      {/* Blog Post Section */}
      <div className="container">
        <div className="row justify-content-center mb-4">
          <div className="col-md-8">
            <div className="text-center">
              {/* Placeholder for blog post image */}
              <img
                src={posts[0]?.blogImage[0]=="h" ? posts[0]?.blogImage : `${import.meta.env.VITE_BASEURL}/blog/${posts[0]?.blogImage}`}
                alt="Blog Title"
                className="img-fluid rounded mb-3"
                height={600}
                width={600}
              />
              {/* Placeholder for blog title */}
              <h2>{posts[0]?.title}</h2>
              {/* use moment.js to format the date */}
              <p className="text-muted small">{ moment(posts[0]?.createdAt).fromNow()}</p>
              {/* Placeholder for blog content */}
              <div className="blog-content">{posts[0]?.content}</div>
            </div>
          </div>
        </div>
      </div>
      {/* Comment Section */}
      <CommentSection postId={postId}  /> /
    </div>
  );
}
