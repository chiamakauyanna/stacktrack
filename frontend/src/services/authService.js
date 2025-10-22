import api from "./api";

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post(`/auth/register/`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

// Log in a user and store tokens
export const loginUser = async (userData) => {
  try {
    const response = await api.post(`/auth/login/`, userData);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
  } catch (error) {
    console.error("Login failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

// Retrieve the authenticated user's profile
export const getProfile = async () => {
  try {
    const response = await api.get(`/auth/profile/`);
    return response.data;
  } catch (error) {
    console.error("Retrieve profile failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

// Fully update the user's profile (PUT)
export const updateProfile = async (profileData) => {
  try {
    const response = await api.put(`/auth/profile/`, profileData);
    return response.data;
  } catch (error) {
    console.error("Update profile failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};

// Partially update the user's profile (PATCH)
export const patchProfile = async (profileData) => {
  try {
    const response = await api.patch(`/auth/profile/`, profileData);
    return response.data;
  } catch (error) {
    console.error("Partial update profile failed", error.response?.data || error.message);
    return error.response?.data || error.message;
  }
};
