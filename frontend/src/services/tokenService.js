import axios from "axios";

const API_URL = import.meta.env.VITE_BASE_URL;

export const refreshToken = async () => {
  try {
    const token = localStorage.getItem("refresh_token");
    const response = await axios.post(`${API_URL}/auth/refresh/`, {
      "refresh": token,
    });
    return response.data;
  } catch (error) {
    console.error("refresh failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};