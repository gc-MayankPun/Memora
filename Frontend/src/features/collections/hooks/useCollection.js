import { useContext } from "react";
import { CollectionContext } from "../collection.context";
import {
  createCollection,
  getCollections,
  updateCollection,
  deleteCollection,
  addSaveToCollection,
  removeSaveFromCollection,
  getSavesInCollection,
} from "../services/collection.api";
import { toast } from "react-toastify";

export const useCollection = () => {
  const context = useContext(CollectionContext);
  const {
    loading,
    setLoading,
    collections,
    setCollections,
    hasFetched,
    setHasFetched,
  } = context;

  async function handleGetCollections() {
    if (hasFetched) return;
    setLoading(true);
    try {
      const data = await getCollections();
      setCollections(data.collections || []);
      setHasFetched(true);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateCollection(name, description) {
    setLoading(true);
    try {
      const data = await createCollection(name, description);
      setCollections((prev) => [data.collection, ...prev]);
      toast.success("Collection created");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateCollection(collectionId, name, description) {
    try {
      const data = await updateCollection(collectionId, name, description);
      setCollections((prev) =>
        prev.map((c) => (c._id === collectionId ? data.collection : c)),
      );
      toast.success("Collection updated");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleDeleteCollection(collectionId) {
    try {
      await deleteCollection(collectionId);
      setCollections((prev) => prev.filter((c) => c._id !== collectionId));
      toast.success("Collection deleted");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleAddSaveToCollection(collectionId, saveId) {
    try {
      const data = await addSaveToCollection(collectionId, saveId);
      setCollections((prev) =>
        prev.map((c) =>
          c._id === collectionId
            ? { ...c, saveCount: (c.saveCount || 0) + 1 }
            : c,
        ),
      );
      toast.success("Added to collection");
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleRemoveSaveFromCollection(collectionId, saveId) {
    try {
      await removeSaveFromCollection(collectionId, saveId);
      toast.success("Removed from collection");
      setCollections((prev) =>
        prev.map((c) =>
          c._id === collectionId
            ? { ...c, saveCount: Math.max(0, (c.saveCount || 0) - 1) }
            : c,
        ),
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }

  async function handleGetSavesInCollection(collectionId) {
    setLoading(true);
    try {
      const data = await getSavesInCollection(collectionId);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    collections,
    handleGetCollections,
    handleCreateCollection,
    handleUpdateCollection,
    handleDeleteCollection,
    handleAddSaveToCollection,
    handleRemoveSaveFromCollection,
    handleGetSavesInCollection,
  };
};
