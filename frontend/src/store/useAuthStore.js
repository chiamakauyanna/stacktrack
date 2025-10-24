import { create } from "zustand";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  patchProfile,
} from "../services/authService";
import {
  clearTokens,
  getAccessToken,
  setTokens,
} from "../utils/tokenManager";

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // ------------------
  // REGISTER
  // ------------------
  register: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await registerUser(data);
      const tokens = res?.data?.tokens;
      const profile = res?.data?.profile;

      if (tokens) setTokens(tokens); 
      if (profile) set({ user: profile });
    } catch (err) {
      console.error("Registration failed:", err);
      set({ error: "Registration failed" });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------
  // LOGIN
  // ------------------
  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const res = await loginUser(credentials);

      const tokens = res?.data?.tokens || res?.tokens;
      const profile = res?.data?.profile || res?.profile;

      if (tokens) setTokens(tokens);
      if (profile) set({ user: profile });
      else {
        // fallback to API if profile not returned
        const fetchedProfile = await getProfile();
        set({ user: fetchedProfile });
      }
    } catch (err) {
      console.error("Login failed:", err);
      set({ error: "Login failed" });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------
  // INITIALIZE SESSION
  // ------------------
  initAuth: async () => {
    const token = getAccessToken();
    if (!token) return;
    set({ loading: true });
    try {
      const profile = await getProfile();
      set({ user: profile });
    } catch {
      clearTokens();
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  // ------------------
  // LOGOUT
  // ------------------
  logout: () => {
    clearTokens();
    set({ user: null });
  },

  // ------------------
  // PROFILE MANAGEMENT
  // ------------------
  updateUserProfile: async (data) => {
    set({ loading: true });
    try {
      const updated = await updateProfile(data);
       set((state) => ({
      user: { ...state.user, ...updated },
    }));
    } catch {
      set({ error: "Failed to update profile" });
    } finally {
      set({ loading: false });
    }
  },

  patchUserProfile: async (data) => {
    set({ loading: true });
    try {
      const updated = await patchProfile(data);
       set((state) => ({
      user: { ...state.user, ...updated },
    }));
    } catch {
      set({ error: "Failed to update profile" });
    } finally {
      set({ loading: false });
    }
  },

}));
