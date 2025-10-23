import api from "./api";

// Register a new user
export const registerUser = async (userData) => {
    const response = await api.post(`/auth/register/`, userData);
    // if tokens are returned, store them
    if (response.data.access) {
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
    }

    return response.data;
};

// Log in a user and store tokens
export const loginUser = async (userData) => {
    const response = await api.post(`/auth/login/`, userData);
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);
    return response.data;
};

// Retrieve the authenticated user's profile
export const getProfile = async () => {
    const response = await api.get(`/auth/profile/`);
    return response.data;
};

// Fully update the user's profile (PUT)
export const updateProfile = async (profileData) => {
    const response = await api.put(`/auth/profile/`, profileData);
    return response.data;
};

// Partially update the user's profile (PATCH)
export const patchProfile = async (profileData) => {
    const response = await api.patch(`/auth/profile/`, profileData);
    return response.data;
};
