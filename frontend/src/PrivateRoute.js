import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken"); // Retrieve the token from localStorage or sessionStorage

  if (!token) {
    // Redirect to login if no token is found
    return <Navigate to="/" replace />;
  }

  return children; // Render the protected component if token exists
};

export default PrivateRoute;
