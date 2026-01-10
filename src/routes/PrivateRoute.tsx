import { Navigate } from "react-router-dom";
import { useUser } from "../contexts/userContext";
import type { JSX } from "react";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useUser();
  const token = localStorage.getItem("token");

  if (!user && !token) {
    // ❌ not logged in → go to login
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
