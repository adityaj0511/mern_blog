import React, { useState, useEffect } from "react";
import { Button, Modal, Alert } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Comment } from "./Comment"; // Import Comment component
import { useSelector } from "react-redux";
import axios from "axios";

export default function CommentSection({ postId }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useSelector((state) => state.auth);

  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const GetALlCommentFromDB = () => {
    // API call to get all comments from database
    axios
      .get(`${import.meta.env.VITE_BASEURL}/comment/get-total-comment`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.comment);
        setComments(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // Dummy comments data
    GetALlCommentFromDB();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BASEURL}/comment/create/${currentUser._id}`,
        { userId: currentUser._id, postId, content: comment },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        GetALlCommentFromDB();
        toast.success(res?.data?.message || "comment updated successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error || "something went wrong");
      });
  };

  // get single user

  return (
    <div className="border p-4 rounded">
      <h5>Leave a Comment</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          placeholder="Add a comment..."
          rows="3"
          maxLength="200"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        ></textarea>
        <div className="d-flex justify-content-between align-items-center mt-2">
          <p className="text-muted small">
            {200 - comment.length} characters remaining
          </p>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>

      <div className="mt-4">
        <h5>Comments ({comments.length})</h5>
        {comments.length === 0 ? (
          <p>No comments yet!</p>
        ) : (
          comments.map((el) => (
            <Comment
              key={el._id}
              NumberOfLikes={el.NumberOfLikes}
              content={el.content}
              userId={el.userId}
              createdAt={el.createdAt}
              commentId={el._id}
              GetALlCommentFromDB={GetALlCommentFromDB}
            />
          ))
        )}
      </div>

      {/* <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="text-danger mb-3" size={40} />
          <h5>Are you sure you want to delete this comment?</h5>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Button variant="danger" onClick={handleDelete}>
              Yes, delete
            </Button>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal> */}
    </div>
  );
}
