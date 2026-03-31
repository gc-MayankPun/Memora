import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Protected = ({ children }) => {
  const { authLoading, user } = useAuth();

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export default Protected;
