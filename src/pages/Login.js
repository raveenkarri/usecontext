import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { Store } from "../index"; // Adjust this import path as necessary
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(Store);
  const [hide, setHide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/api/users/login", {
        email,
        password,
      });

      setToken(res.data.accessToken);
      console.log(res.status);

      navigate("/usercontacts"); // Redirect after successful login
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={submitHandler} className="login-form">
        <input
          className="login-form-input"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <div className="password-container">
          <input
            type={hide ? "text" : "password"}
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="hideButton"
            type="button"
            onClick={() => setHide(!hide)}
          >
            {hide ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <br />
        <button type="submit" className="submit-button">
          Submit
        </button>
        <br />
        <Link to="/register">Don't have an account? Register</Link>
      </form>
    </div>
  );
};

export default Login;
