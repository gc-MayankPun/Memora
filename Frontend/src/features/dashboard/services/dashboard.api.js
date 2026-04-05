import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
});

export const fetchAllSaves = async () => {
  const response = await api.get("/api/saves/");
  return response.data;
};

export const fetchQuerySearch = async (query) => {
  const response = await api.get(
    `/api/saves/search?query=${encodeURIComponent(query)}`,
  );
  console.log(response.data);
  return response.data;
};
