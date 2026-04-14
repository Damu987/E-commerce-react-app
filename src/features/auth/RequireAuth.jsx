import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function RequireAuth({ children }) {
  const { auth } = useAuth();
  
  
  return auth ? children : <Navigate to="/signin" replace />;
}

export default RequireAuth;