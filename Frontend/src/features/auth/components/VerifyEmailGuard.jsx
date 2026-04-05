import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const VerifyEmailGuard = ({ children }) => {
  const { user } = useAuth();
  const isPending = sessionStorage.getItem("pendingEmail");

  if (user) return <Navigate to="/" replace />;
  if (!isPending) return <Navigate to="/login" replace />;

  return children;
};

export default VerifyEmailGuard;
