import { useContext } from "react";
import { fetchAllSaves, fetchQuerySearch } from "../services/dashboard.api";
import { DashboardContext } from "../dashboard.context";
import { toast } from "react-toastify";

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

  async function handleQuerySearch(query) { 
    setLoading(true);
    try {
      const data = await fetchQuerySearch(query);
      setSaves(data.results);

      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    handleFetchAllSaves,
    handleQuerySearch,
    loading,
    saves,
  };
};
