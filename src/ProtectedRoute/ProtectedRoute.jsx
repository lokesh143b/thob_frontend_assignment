// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom"; // Importing Navigate for redirection
import Cookies from "js-cookie"; // Importing js-cookie to access cookies

// ProtectedRoute component to protect routes from unauthorized access
const ProtectedRoute = ({ children }) => {
  // Retrieve the 'token' from cookies to check if the user is authenticated
  const token = Cookies.get("token");

  // If there is no token or if the token is 'undefined', the user is not authenticated
  if (!token || token === "undefined") {
    // Redirect to the login page if the user is not authenticated
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated, render the protected content (children)
  return <>{children}</>; 
};

export default ProtectedRoute;
