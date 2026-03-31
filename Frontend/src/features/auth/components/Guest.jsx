import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Guest = ({ children }) => {
  const { authLoading, user } = useAuth();

  if (authLoading) return <div>Loading...</div>;
  if (user) return <Navigate to="/" replace />;

  return children;
};

export default Guest;
