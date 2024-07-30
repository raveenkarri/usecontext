import React, { useState, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import route from "./routes/Routers";

// Create the context
export const Store = createContext();

// Create a provider component
const StoreProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  return <Store.Provider value={[token, setToken]}>{children}</Store.Provider>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <RouterProvider router={route} />
    </StoreProvider>
  </React.StrictMode>
);
