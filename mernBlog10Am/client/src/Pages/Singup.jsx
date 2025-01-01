import { Alert, Button, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { signUpFailed, signUpRequest, signUpSuccess } from '../redux/auth/authSlice';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

 const {loading}=useSelector((state)=>state.auth)
 const navigate=useNavigate()
  const dispatch=useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUpRequest())
    axios.post(`${import.meta.env.VITE_BASEURL}/user/sing-up`,{name,email,password},{withCredentials:true})
    .then((response)=>{
      alert(response.data.message)
      dispatch(signUpSuccess())
      console.log(response)
       navigate("/otp")
    }).catch((err)=>{
      
      alert(err?.response?.data?.error)
      dispatch(signUpFailed(err?.response?.data?.error))
      console.log(err)
    })
  };

  return loading ? <h1>Loading...</h1>:  (
    <section style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
      <div className="container py-3">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-xl-9">
            <div className="card text-black" style={{ borderRadius: '20px' }}>
              <div className="card-body p-4">
                <div className="row justify-content-center">
                  <div className="col-lg-6">
                    <h2 className="text-center fw-bold mb-3">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Your Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Your Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>

                      <div className="d-grid">
                        <button  type="submit"  className="btn btn-primary " >
                     Register 

                        </button>
                      </div>

                      <div className="text-center mt-3">
                        <p>Already have an account? <Link to="/sing-in">Login</Link></p>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-5 d-flex align-items-center">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                      className="img-fluid"
                      alt="Sample"
                      style={{ maxHeight: '300px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
