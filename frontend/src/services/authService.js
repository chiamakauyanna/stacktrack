import api from "./api";
import { setTokens } from "../utils/tokenManager";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register/", userData);
  const tokens = response.data?.data?.tokens;
  if (tokens) setTokens(tokens);
  return response.data?.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login/", userData);
  setTokens(response.data);
  return response.data;
};

export const getProfile = async () => (await api.get("/auth/profile/")).data;

export const updateProfile = async (data) =>
  (await api.put("/auth/profile/", data)).data;

export const patchProfile = async (data) =>
  (await api.patch("/auth/profile/", data)).data;
