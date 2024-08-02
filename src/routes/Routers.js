import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserContacts from "../pages/contacts/UserContacts";
import { Store } from "../index";
import { useContext } from "react";
import ErrorPage from "../pages/ErrorPage";

const ProtectedRoute = ({ children }) => {
  const [token] = useContext(Store);

  return token ? children : <ErrorPage />;
};

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
        element: (
          <ProtectedRoute>
            <UserContacts />
          </ProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
export default route;
