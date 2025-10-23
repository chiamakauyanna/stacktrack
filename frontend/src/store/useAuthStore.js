import { create } from "zustand";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  patchProfile,
} from "../services/authService";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const data = await registerUser(userData);
      // Immediately set user profile if returned
      if (data.bio || data.role) {
        set({ user: data, loading: false });
      } else {
        set({ loading: false });
      }
      return data;
    } catch (error) {
      console.error("Registration error:", error);
      set({ loading: false, error: "Registration failed" });
      throw error;
    }
  },

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const tokens = await loginUser(credentials);
      if (tokens.access) {
        localStorage.setItem("access_token", tokens.access);
        localStorage.setItem("refresh_token", tokens.refresh);
        const profile = await getProfile();
        set({ user: profile, loading: false });
      } else {
        set({ error: "Invalid credentials", loading: false });
      }
    } catch (error) {
      console.error("Login error:", error);
      set({ loading: false, error: "Login failed" });
    }
  },

  initAuth: async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;
    set({ loading: true, error: null });
    try {
      const profile = await getProfile();
      set({ user: profile, loading: false });
      // eslint-disable-next-line no-unused-vars
    } catch (error) {
      console.warn("Auto-login failed, clearing tokens.");
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      set({ user: null, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    set({ user: null });
  },

  updateUserProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const data = await updateProfile(profileData);
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Profile update failed:", error);
      set({ loading: false, error: "Failed to update profile" });
    }
  },

  patchUserProfile: async (profileData) => {
    set({ loading: true, error: null });
    try {
      const data = await patchProfile(profileData);
      set({ user: data, loading: false });
    } catch (error) {
      console.error("Partial profile update failed:", error);
      set({ loading: false, error: "Failed to update profile" });
    }
  },
}));
