import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserContacts.css";
import axios from "axios";
import { Store } from "../index";

const UserContacts = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [token, setToken] = useContext(Store);

  useEffect(() => {
    if (token) {
      fetchContacts();
      console.log(token);
    } else {
      console.log("No token available!!");
    }
  }, [token]);
  //for contacts of login user
  const fetchContacts = async () => {
    try {
      const res = await axios.get(
        "https://backend-lsp7.onrender.com/api/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUserData(res.data.contacts);
      setUser(res.data.user.username);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };
  //for adding new contact to login user
  const contactHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const contactSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend-lsp7.onrender.com/api/contacts",
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contact submitted successfully!!");
      fetchContacts();
    } catch (Error) {
      console.log(Error);
      alert("Contact not submitted");
    }
  };

  return (
    <div>
      <h1>Hi {user}!</h1>
      <div>
        <form onSubmit={contactSubmit}>
          <input
            type="text"
            name="name"
            value={contact.name}
            placeholder="Contact name"
            onChange={contactHandler}
          />
          <br />
          <input
            type="text"
            name="email"
            value={contact.email}
            placeholder="Contact email"
            onChange={contactHandler}
          />
          <br />
          <input
            type="text"
            name="phone"
            value={contact.phone}
            placeholder="Contact Number"
            onChange={contactHandler}
          />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
      <hr />
      <h1>Your Contacts:</h1>
      <table id="customers">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Contact</th>
            <th>Edit or Delete</th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>Edit Delete</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No contacts found</td>
            </tr>
          )}
        </tbody>
      </table>
      <h1>
        <Link to="/">{userData.length > 0 ? "Logout" : "Login"}</Link>
      </h1>
    </div>
  );
};

export default UserContacts;
