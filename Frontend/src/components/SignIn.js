import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./auth.css";

const SignIn = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter your password.");
      return;
    }

    const user = { email: username, password: password };

    try {
      const response = await axios.post("http://localhost:5000/auth/login", user);
      const { token, message } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login Successful!");
        setTimeout(() => navigate('/dashboard'), 1500);
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error("Login failed! Please check your credentials and try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-3">Sign In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>


          <button className="btn w-100" type="submit" style={{backgroundColor:"rgb(242, 7, 109)",color:"white"}}>
            Sign In
          </button>

          <p className="mt-3 text-center">
            Don't have an account?
            <Link to='/signup' className="text-danger ms-1">Sign Up</Link>
          </p>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
