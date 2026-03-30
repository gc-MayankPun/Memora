import { useContext } from "react";
import { fetchAllSaves } from "../services/dashboard.api";
import { DashboardContext } from "../dashboard.context";
import { toast } from "react-toastify";
import { deleteAccount, logoutUser } from "../../auth/services/auth.api";

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  const { setLoading, loading, setSaves, saves } = context;

  async function handleFetchAllSaves() {
    setLoading(true);
    try {
      const data = await fetchAllSaves();
      setSaves(data.saves);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    setLoading(true);
    try {
      const data = await logoutUser();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteAccount() {
    setLoading(true);
    try {
      const data = await deleteAccount();
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    handleFetchAllSaves,
    handleLogout,
    handleDeleteAccount,
    loading,
    saves,
  };
};
