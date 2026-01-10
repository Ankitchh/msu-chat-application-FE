import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import type { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  if (user && token) {
    // ✅ already logged in → go to chat
    return <Navigate to="/chat" replace />;
  }

  return children;
};

export default PublicRoute;
