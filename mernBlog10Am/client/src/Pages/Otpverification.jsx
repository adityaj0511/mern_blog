import React, { useState } from "react";
import OtpInput from "react-otp-input";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"
export default function OtpVerification() {
  const [otp, setOtp] = useState("");
const navigate=useNavigate()
  const handleVerify = () => {
    axios.post(
      `${import.meta.env.VITE_BASEURL}/user/verification`,
      { otp },
      {
        withCredentials: true,
      }
    ).then((res)=>{
      console.log(res.data);
      alert(res?.data?.message)
      navigate("/sign-in")
    }).catch((err)=>{
      console.log(err)
    })
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="card p-4 shadow"
        style={{ maxWidth: "400px", width: "100%", borderRadius: "10px" }}
      >
        <h3 className="text-center mb-4">🔐 Verify Your OTP</h3>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={4}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            width: "60px",
            height: "60px",
            fontSize: "24px",
            borderRadius: "8px",
            border: "1px solid #ced4da",
            textAlign: "center",
            backgroundColor: "#f8f9fa",
            color: "#495057",
            marginLeft: "10px",
          }}
          focusStyle={{
            outline: "none",
            border: "2px solid #007bff",
            backgroundColor: "#fff",
          }}
        />

        <button
          className="btn btn-primary mt-4 w-100"
          onClick={handleVerify}
          disabled={otp.length < 4}
          style={{
            fontSize: "18px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          Verify
        </button>
      </div>
    </div>
  );
}
