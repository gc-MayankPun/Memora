import { useAuth } from "../features/auth/hooks/useAuth";
import "./app-gate.scss"

const AppGate = ({ children }) => {
  const { authLoading } = useAuth();

  if (authLoading) {
    return (
      <div className="appgate-loading">
        <div className="appgate-loading__logo">
          memora<span>.</span>
        </div>
        <div className="appgate-loading__dots">
          <span />
          <span />
          <span />
        </div>
        <p className="appgate-loading__hint">Loading your workspace</p>
      </div>
    );
  }

  return children;
};

export default AppGate;
