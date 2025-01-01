import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateUserSuccess } from "../redux/auth/authSlice";
export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.auth);
  const [image, setimage] = useState(null);
  const [name, setname] = useState(currentUser.name || "");
console.log(currentUser)
const dispatch=useDispatch()
  const GetCurrentUserData=()=>{
    axios.get(`${import.meta.env.VITE_BASEURL}/user/getuser/${currentUser._id}`,{
      withCredentials:true
    })
    .then((res)=>{
      console.log(res.data.data);
      dispatch(updateUserSuccess(res.data.data))
    }).catch((err)=>{
      console.log(err);
    })
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .patch(
        `${import.meta.env.VITE_BASEURL}/user/update/${currentUser._id}`,
        { profileImage: image, name },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        GetCurrentUserData()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="container"
      style={{ maxWidth: "35%", position: "absolute", top: "10%", left: "40%" }}
    >
      <h1 className="text-center mb-4">Profile</h1>
      <form className="d-flex flex-column gap-4" onSubmit={handlesubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setimage(e.target.files[0])}
          className="d-none"
        />

        <div className="text-center mb-4">
          <div
            className="position-relative"
            style={{ width: "150px", height: "150px", margin: "0 auto" }}
            onClick={() => document.querySelector('input[type="file"]').click()}
          >
            <img
              src={currentUser ? `${import.meta.env.VITE_BASEURL+"/user/"+currentUser.profileImage}`:"https://via.placeholder.com/150"}
              alt="user"
              className="rounded-circle w-100 h-100 border border-light shadow"
              style={{ objectFit: "cover" }}
            />
            <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center text-white rounded-circle">
              <span className="fs-6">Change Photo</span>
            </div>
          </div>
        </div>

        <input
          type="text"
          className="form-control rounded-pill shadow-sm"
          placeholder="Username"
          defaultValue={currentUser?.name}
          onChange={(e) => setname(e.target.value)}
        />
        <input
          type="email"
          className="form-control rounded-pill shadow-sm"
          placeholder="Email"
          disabled
          defaultValue={currentUser?.email}
        />

        <Button
          variant="primary"
          type="submit"
          className="rounded-pill shadow-sm"
        >
          Update
        </Button>

        {/* Conditionally render the Create a Post button if the user is an admin */}
        {currentUser?.admin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              variant="secondary"
              className="rounded-pill shadow-sm w-100"
            >
              Create a Post
            </Button>
          </Link>
        )}
      </form>
    </div>
  );
}

