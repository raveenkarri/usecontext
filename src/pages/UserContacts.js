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
  const [editContactId, setEditContactId] = useState(null); // Store editing state

  useEffect(() => {
    if (token) {
      fetchContacts();
    } else {
      console.log("No token available!!");
    }
  }, [token]);

  // Get contacts of logged-in user
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
      console.log(res.data.contacts);
      setUserData(res.data.contacts);
      setUser(res.data.user.username);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  const contactHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const contactSubmit = async (e) => {
    e.preventDefault();
    if (editContactId) {
      await updateContact(editContactId);
    } else {
      await addContact();
    }
  };

  // Add new contact
  const addContact = async () => {
    try {
      await axios.post(
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
      setContact({ name: "", email: "", phone: "" });
    } catch (Error) {
      console.log(Error);
      alert("Contact not submitted");
    }
  };

  // Update existing contact
  const updateContact = async (contactId) => {
    try {
      await axios.put(
        `https://backend-lsp7.onrender.com/api/contacts/${contactId}`,
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contact updated successfully!!");
      fetchContacts();
      setEditContactId(null);
      setContact({ name: "", email: "", phone: "" });
    } catch (Error) {
      console.log(Error);
      alert("Contact not updated");
    }
  };

  // Delete contact
  const deleteContact = async (contactId) => {
    try {
      await axios.delete(
        `https://backend-lsp7.onrender.com/api/contacts/${contactId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contact deleted successfully!!");
      fetchContacts();
    } catch (Error) {
      console.log(Error);
      alert("Contact not deleted");
    }
  };

  // Handle edit button click
  const handleEditClick = (contact) => {
    setContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
    setEditContactId(contact._id);
  };

  return (
    <div>
      <center>
        <h1>Hi {user}!</h1>
      </center>
      <div className="contact-form">
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
          <button className="submit-container" type="submit">
            {editContactId ? "Update" : "Submit"}
          </button>
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
            userData.map((contact, index) => (
              <tr key={index}>
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone}</td>
                <td>
                  <button
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      marginRight: 20,
                    }}
                    type="button"
                    onClick={() => handleEditClick(contact)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      backgroundColor: "red",
                      color: "black",
                      marginRight: 20,
                    }}
                    type="button"
                    onClick={() => deleteContact(contact._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No contacts found</td>
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
