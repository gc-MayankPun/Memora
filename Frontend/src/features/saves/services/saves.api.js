import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const fetchSave = async (id) => {
  const response = await api.get(`/api/saves/${id}`);
  return response.data;
};
 
export const checkSaveExists = async (url) => {
  const response = await api.get(
    `/api/saves/exists?url=${encodeURIComponent(url)}`,
  );
  return response.data;
};

export const deleteSave = async (id) => {
  const response = await api.delete(`/api/saves/${id}/delete`);
  return response.data;
};

export const updateSave = async (id, payload) => {
  const response = await api.patch(`/api/saves/${id}/update-favorite`, payload);
  return response.data;
};

export const updateTags = async (id, tags) => {
  const response = await api.patch(`/api/saves/${id}/update-tags`, { tags });
  return response.data;
};
