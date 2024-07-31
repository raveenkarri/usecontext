import axios from "axios";

const apiRequest = async (method, url, token, data = null) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await axios({ method, url, data, ...config });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
const fetchContacts = async (token) => {
  return await apiRequest(
    "get",
    "https://backend-lsp7.onrender.com/api/contacts",
    token
  );
};
const createContact = async (token, contact) => {
  return await apiRequest(
    "post",
    "https://backend-lsp7.onrender.com/api/contacts",
    token,
    contact
  );
};
const editContact = async (token, contactId, contact) => {
  return await apiRequest(
    "put",
    `https://backend-lsp7.onrender.com/api/contacts/${contactId}`,
    token,
    contact
  );
};
const deleteContact = async (token, contactId) => {
  return await apiRequest(
    "delete",
    `https://backend-lsp7.onrender.com/api/contacts/${contactId}`,
    token
  );
};

export { fetchContacts, createContact, editContact, deleteContact };
