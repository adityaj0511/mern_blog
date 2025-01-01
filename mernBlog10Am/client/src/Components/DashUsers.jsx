import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

export default function DashUsers() {
  // Sample user data (replace with actual data as needed)
  const [users, setusers] = useState([]);
  //   const users = [
  //     {
  //       _id: '1',
  //       createdAt: '2024-01-01',
  //       profilePicture: 'https://via.placeholder.com/150',
  //       username: 'user1',
  //       email: 'user1@example.com',
  //       isAdmin: true,
  //     },
  //     {
  //       _id: '2',
  //       createdAt: '2024-01-02',
  //       profilePicture: 'https://via.placeholder.com/150',
  //       username: 'user2',
  //       email: 'user2@example.com',
  //       isAdmin: false,
  //     },
  //     {
  //         _id: '3',
  //         createdAt: '2024-01-02',
  //         profilePicture: 'https://via.placeholder.com/150',
  //         username: 'user2',
  //         email: 'user2@example.com',
  //         isAdmin: true,
  //       }
  //     // Add more sample users as needed
  //   ];

  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  const openDeleteModal = (userId) => {
    axios
      .delete(`${import.meta.env.VITE_BASEURL}/user/delete/${userId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        getTotalUserFromdb()
        setUserIdToDelete(userId);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalUserFromdb = () => {
    // get total number of user from db
    axios
      .get(`${import.meta.env.VITE_BASEURL}/user/getusers`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.data);
        setusers(res.data.data);
        // toast.success(res.data?.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getTotalUserFromdb();
  }, []);
  return (
    <div
      className="container py-4"
      style={{ maxWidth: "60%", position: "absolute", top: "10%", left: "30%" }}
    >
      <h2 className="text-center mb-4">User List</h2>
      {users.length > 0 ? (
        <>
          <Table hover bordered className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Date Created</th>
                <th>User Image</th>
                <th>Username</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="align-middle">
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>
                    <img
                      src={
                        user.profileImage[0] != "h"
                          ? `${
                              import.meta.env.VITE_BASEURL +
                              "/user/" +
                              user.profileImage
                            }`
                          : user.profileImage
                      }
                      alt={user.username}
                      className="rounded-circle"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text-center">
                    {user.admin ? (
                      <FaCheck className="text-success" />
                    ) : (
                      <FaTimes className="text-danger" />
                    )}
                  </td>
                  <td className="text-center">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => openDeleteModal(user._id)}
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
        <p className="text-center">You have no users yet!</p>
      )}

      {/* Delete Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <HiOutlineExclamationCircle className="h-14 w-14 text-warning mb-4" />
          <p className="mb-4">
            Are you sure you want to delete this user? This action cannot be
            undone.
          </p>
          <Button
            variant="danger"
            className="me-2"
            onClick={() => {
              // Handle the delete functionality here
              setShowModal(false);
            }}
          >
            Yes, Delete
          </Button>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
