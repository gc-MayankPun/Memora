import { Navigate } from "react-router";

const VerifyEmailGuard = ({ children }) => {
  const isPending = sessionStorage.getItem("pendingEmail");

  if (!isPending) return <Navigate to="/login" replace />;

  return children;
};

export default VerifyEmailGuard;
