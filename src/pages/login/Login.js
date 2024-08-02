import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import { Store } from "../../index"; // Adjust this import path as necessary
import "./Login.css"; // Import the CSS file

const Login = () => {
  const navigate = useNavigate();
  const [token, setToken] = useContext(Store);
  const [hide, setHide] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting
    try {
      const res = await axios.post(
        "https://backend-lsp7.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );

      setToken(res.data.accessToken);
      console.log(res.status);

      navigate("/usercontacts"); // Redirect after successful login
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false); // Set loading to false after response is received
    }
  };

  return (
    <>
      <div className="login-container">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div>
            <h1>Login:</h1>

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
                  className="login-form-input"
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
        )}
      </div>
    </>
  );
};

export default Login;
