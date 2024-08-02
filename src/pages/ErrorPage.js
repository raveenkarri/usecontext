import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <center>
        <h1 style={{ color: "red", fontSize: "24px" }}>Access Denied</h1>
        <p style={{ fontSize: "24px" }}>
          You need to be logged in to view this page.
        </p>
        <Link to="/" style={{ color: "blue", fontSize: "24px" }}>
          LogIn
        </Link>
      </center>
    </div>
  );
};

export default ErrorPage;
