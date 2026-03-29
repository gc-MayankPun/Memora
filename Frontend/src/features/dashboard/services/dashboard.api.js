import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const fetchAllSaves = async () => {
  const response = await api.get("/api/saves/");
  return response.data;
};
