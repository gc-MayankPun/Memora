import { useContext, useState } from "react";
import {
  deleteSave,
  fetchSave,
  fetchAllSaves,
  updateNote,
  updateSave,
  updateTags,
} from "../services/saves.api";
import { SaveContext } from "../saves.context";
import { toast } from "react-toastify";
import { DashboardContext } from "../../dashboard/dashboard.context";

export const useSaves = () => {
  const context = useContext(SaveContext);
  const { setLoading, loading, setSave, save } = context;
  const [allSaves, setAllSaves] = useState([]);

  async function handleFetchSave(id) {
    setLoading(true);
    setSave(null);

    try {
      const [saveData, allData] = await Promise.all([
        fetchSave(id),
        fetchAllSaves(),
      ]);

      setSave(saveData.save);
      setAllSaves(allData.saves || []);
      return saveData;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSave(id) {
    setLoading(true);
    try {
      const data = await deleteSave(id);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleFavorite(id, currentValue) {
    try {
      const data = await updateSave(id, { isFavorite: !currentValue });
      setSave((prev) => ({ ...prev, isFavorite: data.save.isFavorite }));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleUpdateTags(id, tags) {
    try {
      const data = await updateTags(id, tags);
      setSave((prev) => ({ ...prev, tags: data.save.tags }));
      toast.success("Tags updated");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleUpdateNote(id, note) {
    try {
      const data = await updateNote(id, note);
      setSave((prev) => ({ ...prev, note: data.save.note }));
      toast.success("Note saved");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  return {
    handleFetchSave,
    handleDeleteSave,
    handleToggleFavorite,
    handleUpdateTags,
    handleUpdateNote,
    loading,
    save,
    allSaves,
  };
};
