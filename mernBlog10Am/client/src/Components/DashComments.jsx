import axios from "axios";
import { useEffect, useState } from "react";

import { Modal, Table, Button } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useSelector } from "react-redux";

// Dummy comments data


export default function DashComments() {
  const { currentUser } = useSelector((state) => state.auth);
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const handleDelete = (commentId) => {
    setShowModal(true);
    setCommentIdToDelete(commentId);
    //
    axios.delete(`${import.meta.env.VITE_BASEURL}/comment/delete/${commentId}/${currentUser._id}`,{
      withCredentials: true,
    } ).then((res)=>{
      console.log(res)
      getTotlaComment()
    }).catch((err)=>{
      console.log(err)
    })
  };

  const confirmDelete = () => {
    setComments((prev) =>
      prev.filter((comment) => comment._id !== commentIdToDelete)
    );
    setShowModal(false);
  };
  const getTotlaComment = () => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/comment/get-total-comment`, {
        withCredentials: true,
      })
      .then((res) => {
        setComments(res.data.comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTotlaComment();
  }, []);

  return (
    <div
      className="container p-3"
      style={{ maxWidth: "60%", position: "absolute", top: "10%", left: "25%" }}
    >
      {currentUser?.admin && comments.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Date Updated</th>
                <th>Comment Content</th>
                <th>Likes</th>
                <th>Post ID</th>
                <th>User ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.length > 0 && comments.map((comment) => (
                <tr key={comment._id}>
                  <td>{new Date(comment.updatedAt).toLocaleDateString()}</td>
                  <td>{comment.content}</td>
                  <td>{comment.numberOfLikes}</td>
                  <td>{comment.postId}</td>
                  <td>{comment.userId}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(comment._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-center">You have no comments yet!</p>
      )}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <HiOutlineExclamationCircle className="me-2" />
            Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
