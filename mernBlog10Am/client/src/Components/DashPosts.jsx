import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
export default function DashPosts() {
  // Dummy data to replace actual API data
  const { currentUser } = useSelector((state) => state.auth);
  const [posts, setposts] = useState([]);
  const [limit, setlimit] = useState(2);

  const getAllPostData = () => {
    axios
      .get(
        `${import.meta.env.VITE_BASEURL}/post/getpost?limit=${limit}`,

        {
          withCredentials: true,
        }
      )
      .then((res) => {
        setposts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllPostData();
  }, [limit]);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState("");

  const handleDeletePost = () => {
    // Handle post deletion logic here
    setShowModal(false);

    axios
      .delete(
        `${import.meta.env.VITE_BASEURL}/post/delete/${postIdToDelete}/${
          currentUser._id
        }`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        getAllPostData();
        toast.success(res?.data?.message || "post deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        //toast
        toast.error(err?.response?.data?.error || "something went wrong");
      });
  };

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "60%",
        position: "absolute",
        top: "10%",
        left: "25%",
        border: "2px solid red",
      }}
    >
      <h2 className="text-center mb-4">User Posts</h2>
      {currentUser.admin && posts.length > 0 ? (
        <>
          <Table bordered hover className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Date Updated</th>
                <th>Post Image</th>
                <th>Post Title</th>
                <th>Category</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {posts?.map((post) => (
                <tr key={post._id}>
                  <td>{new Date(post.updatedAt).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/post/${post.slug}`}>
                      <img
                        src={
                          post.blogImage[0] != "h"
                            ? `${
                                import.meta.env.VITE_BASEURL +
                                "/blog/" +
                                post.blogImage
                              }`
                            : post.blogImage
                        }
                        alt={post.title}
                        height={100}
                        width={100}
                        className="w-20 h-10 object-cover rounded"
                      />
                    </Link>
                  </td>
                  <td>
                    <Link
                      className="text-decoration-none text-dark"
                      to={`/post/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td>{post.category}</td>
                  <td>
                    <span
                      style={{ cursor: "pointer" }}
                      className="text-danger"
                      onClick={() => {
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }}
                    >
                      Delete
                    </span>
                  </td>
                  <td>
                    <Link
                      className="text-primary"
                      to={`/update-post/${post._id}`}
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Button
            variant="outline-primary"
            className="w-100 mt-3"
            onClick={() => setlimit(limit + 2)}
          >
            Show more
          </Button>
        </>
      ) : (
        <p className="text-center">You have no posts yet!</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="text-warning mb-3" size={40} />
          <p>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="danger"
              onClick={handleDeletePost}
              className="me-3"
            >
              Yes, delete
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
