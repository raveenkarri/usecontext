import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import axios from "axios";
import "./Register.css"; // Import the CSS file

const Register = () => {
  const navigate = useNavigate();
  const [hide, setHide] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-lsp7.onrender.com/api/users/register",
        data
      );
      console.log(response.data);
      alert("Registered Successfully!!");
      navigate("/");
    } catch (error) {
      console.error(error);
      // Handle error
    }
    setData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form
        onSubmit={submitHandler}
        autoComplete="off"
        className="register-form"
      >
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={data.username}
          onChange={changeHandler}
        />
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={data.email}
          onChange={changeHandler}
        />
        <br />
        <div className="password-container">
          <input
            type={hide ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={data.password}
            onChange={changeHandler}
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
        <button type="submit">Submit</button>
        <br />
        <h1>
          <Link to="/usercontacts">User contacts -</Link>
          <br />
          <Link to="/">Login-</Link>
        </h1>
      </form>
    </div>
  );
};

export default Register;
