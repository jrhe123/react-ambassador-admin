import React from "react";
import { Navigate } from "react-router-dom";

function RedirectToUsers() {
  return <Navigate to="/users" replace />;
}

export default RedirectToUsers;
