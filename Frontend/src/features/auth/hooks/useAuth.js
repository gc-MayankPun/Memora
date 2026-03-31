import { useContext } from "react";
import { AuthContext } from "../auth.context";
import {
  deleteAccount,
  getMe,
  login,
  logoutUser,
  register,
  resendVerificationEmail,
} from "../services/auth.api";
import { toast } from "react-toastify";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { actionLoading, setActionLoading, user, setUser } = context;

  async function handleRegister({ email, username, password }) {
    setActionLoading(true);
    try {
      const data = await register({ email, username, password });
      toast.success(data.message);
      sessionStorage.setItem("pendingEmail", email);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleLogin({ username, password }) {
    setActionLoading(true);
    try {
      const data = await login({ username, password });
      toast.success(data.message);
      setUser(data.user);
      sessionStorage.removeItem("pendingEmail");

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleLogout() {
    setActionLoading(true);
    try {
      const data = await logoutUser();
      setUser(null);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setActionLoading(true);
    try {
      const data = await deleteAccount();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleGetMe() {
    setActionLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);

      return data;
    } catch (error) {
      setUser(null);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleResendVerification({ email }) {
    setActionLoading(true);
    try {
      const data = await resendVerificationEmail({ email });
      toast.success(data.message);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setActionLoading(false);
    }
  }

  return {
    actionLoading,
    user,
    handleRegister,
    handleLogin,
    handleLogout,
    handleDeleteAccount,
    handleGetMe,
    handleResendVerification,
  };
};
