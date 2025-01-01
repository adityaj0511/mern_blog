import moment from "moment";
import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export function Comment({
  userId,
  GetALlCommentFromDB,
  content,
  NumberOfLikes,
  createdAt,
  commentId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const { currentUser } = useSelector((state) => state.auth);
  const [edit, setedit] = useState(content ? content : "");
  const [users, setusers] = useState({});

  const handleLike = (commentId, userId) => {
    axios
      .patch(
        `${import.meta.env.VITE_BASEURL}/comment/like/${commentId}/${userId}`,
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        GetALlCommentFromDB();
        // toast.success(res?.data?.message || "liked successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.error || "something went wrong");
      });
  };

  // edit
  const handleEdit = (commentId, userId) => {
    setIsEditing(false);
    axios
      .patch(
        `${import.meta.env.VITE_BASEURL}/comment/edit/${commentId}/${userId}`,
        { content: edit },
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

  const handleDelete = (commentId) => {
    // setShowModal(false);
    axios
    .delete(
      `${import.meta.env.VITE_BASEURL}/comment/delete/${commentId}/${userId}`,
      
      {
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      GetALlCommentFromDB();
      toast.success(res?.data?.message || "comment delete successfully");
    })
    .catch((err) => {
      console.log(err);
      toast.error(err?.response?.data?.error || "something went wrong");
    });
  };

  const getUser = (userId) => {
    axios
      .get(`${import.meta.env.VITE_BASEURL}/user/getuser/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        setusers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUser(userId);
  }, []);
  return (
    <div className="d-flex p-3 border-bottom">
      <div className="me-3">
        <img
          className="rounded-circle"
          src={users.profileImage}
          alt={users.name}
          // style={{backgroundColor:"black"}}
          width="40"
          height="40"
        />
      </div>
      <div className="flex-grow-1">
        <div className="d-flex align-items-center mb-1">
          <span className="fw-bold me-2">@{users.name}</span>
          <span className="text-muted small">
            {moment(createdAt).fromNow()}
          </span>
        </div>
        {isEditing ? (
          <>
            <textarea
              className="form-control mb-2"
              onChange={(e) => setedit(e.target.value)}
              value={edit}
            />
            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" size="sm"  onClick={() => handleEdit(commentId, currentUser._id)}>
                Save
              </Button>
              <Button
                variant="secondary"
                size="sm"
               
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="text-muted">{content}</p>
            <div className="d-flex align-items-center gap-2 border-top pt-2">
              <button className="btn btn-link p-0 text-muted">
                <FaThumbsUp
                  onClick={() => handleLike(commentId, currentUser._id)}
                />
              </button>
              <span className="text-muted small">{NumberOfLikes} likes</span>

              {currentUser._id !== userId ? (
                ""
              ) : (
                <div>
                  <Button
                    variant="link"
                    className="text-muted"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleDelete(commentId)}
                    className="text-danger"
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
