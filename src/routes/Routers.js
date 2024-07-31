import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserContacts from "../pages/contacts/UserContacts";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "usercontacts",
        element: <UserContacts />,
      },
    ],
  },
]);
export default route;
