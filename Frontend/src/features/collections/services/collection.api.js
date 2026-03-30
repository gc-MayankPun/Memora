import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export async function createCollection(name, description) {
  const response = await api.post("/api/collections", { name, description });
  return response.data;
}

export async function getCollections() {
  const response = await api.get("/api/collections");
  return response.data;
}

export async function updateCollection(collectionId, name, description) {
  const response = await api.patch(`/api/collections/${collectionId}`, {
    name,
    description,
  });
  return response.data;
}

export async function deleteCollection(collectionId) {
  const response = await api.delete(`/api/collections/${collectionId}`);
  return response.data;
}

export async function addSaveToCollection(collectionId, saveId) {
  const response = await api.post(`/api/collections/${collectionId}/saves`, {
    saveId,
  });
  return response.data;
}

export async function removeSaveFromCollection(collectionId, saveId) {
  const response = await api.delete(
    `/api/collections/${collectionId}/saves/${saveId}`,
  );
  return response.data;
}

export async function getSavesInCollection(collectionId) {
  const response = await api.get(`/api/collections/${collectionId}/saves`);
  return response.data;
}
