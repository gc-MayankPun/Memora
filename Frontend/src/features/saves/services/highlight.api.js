import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const getHighlights = async (saveId) => {
  const response = await api.get(`/api/highlights/${saveId}`);
  return response.data;
};

export const deleteHighlight = async (saveId, highlightId) => {
  const response = await api.delete(`/api/highlights/${saveId}/${highlightId}`);
  return response.data;
};
