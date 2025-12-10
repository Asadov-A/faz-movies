import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  let token = localStorage.getItem("faz-token");

  if (!token) {
    return <Navigate replace to="/login" />;
  }
  return children;
}

export default ProtectedRoute;