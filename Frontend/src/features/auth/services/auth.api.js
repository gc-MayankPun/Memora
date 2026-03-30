import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async ({ username, email, password }) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    password,
  });
  return response.data;
};

export const login = async ({ username, password }) => {
  const response = await api.post("/api/auth/login", { username, password });
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/get-me");
  return response.data;
};

export const resendVerificationEmail = async ({ email }) => {
  const response = await api.post("/api/auth/resend-verification", { email });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/api/auth/delete-account");
  return response.data;
};
