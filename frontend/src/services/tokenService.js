import axios from "axios";
import { getRefreshToken, setTokens } from "../utils/tokenManager";

const API_URL = import.meta.env.VITE_BASE_URL;

export const refreshToken = async () => {
  const refresh = getRefreshToken();
  const response = await axios.post(`${API_URL}/auth/refresh/`, { refresh });
  setTokens(response.data);
  return response.data;
};
