import api from "./api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post(`/auth/register/`, userData);
    return response.data;
  } catch (error) {
    console.error("registration failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post(`/auth/login/`, userData);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("login failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};


