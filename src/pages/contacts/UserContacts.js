import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UserContacts.css";

import { Store } from "../../index";
import {
  fetchContacts,
  createContact,
  editContact,
  deleteContact,
} from "../fucntions/CrudFunctions";

const UserContacts = () => {
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [user, setUser] = useState("");
  const [userData, setUserData] = useState([]);
  const [token] = useContext(Store);
  const [editContactId, setEditContactId] = useState(null);

  useEffect(() => {
    if (token) {
      getContacts();
    } else {
      console.log("No token available!!");
    }
  }, []);

  const contactHandler = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  // Get contacts of logged-in user
  const getContacts = async () => {
    try {
      const res = await fetchContacts(token);
      console.log(res.contacts);
      setUserData(res.contacts);
      setUser(res.user.username);
    } catch (err) {
      console.error("Error fetching contacts:", err);
    }
  };

  // Handle form submission
  const contactSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editContactId) {
        await updateContact(editContactId);
        alert("Contact updated successfully!!");
      } else {
        await addContact();
        alert("Contact submitted successfully!!");
      }
      getContacts();
      resetForm();
    } catch (error) {
      alert(`Contact not ${editContactId ? "updated" : "submitted"}`);
    }
  };

  // Add new contact
  const addContact = async () => {
    try {
      await createContact(token, contact);

      getContacts();
      resetForm();
    } catch (Error) {
      console.log(Error);
      alert("Contact not submitted");
    }
  };

  // Update existing contact
  const updateContact = async (contactId) => {
    try {
      await editContact(token, contactId, contact);

      getContacts();
      resetForm();
    } catch (Error) {
      console.log(Error);
      alert("Contact not updated");
    }
  };

  // Delete contact
  const handleDeleteContact = async (contactId) => {
    try {
      await deleteContact(token, contactId);
      alert("Contact deleted successfully!!");
      getContacts();
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

  const resetForm = () => {
    setContact({ name: "", email: "", phone: "" });
    setEditContactId(null);
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
                    onClick={() => handleDeleteContact(contact._id)}
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
