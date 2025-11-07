import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getProfile,
  loginUser,
  registerUser,
  updateProfile,
  patchProfile,
} from "../services/authService";
import { clearTokens, getAccessToken } from "../utils/tokenManager";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      loading: false,
      error: null,

      // REGISTER
      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const res = await registerUser(data);
          const profile = res.user || (await getProfile());
          set({ user: profile });
          return profile;
        } catch (err) {
          console.error("Registration failed:", err);
          set({ error: "Registration failed" });
        } finally {
          set({ loading: false });
        }
      },

      // LOGIN
      login: async (credentials) => {
        set({ loading: true, error: null });
        try {
          const res = await loginUser(credentials);
          const profile = res.user || (await getProfile());
          set({ user: profile });
          return profile;
        } catch (err) {
          console.error("Login failed:", err);
          set({ error: "Login failed" });
        } finally {
          set({ loading: false });
        }
      },

      // INITIALIZE SESSION
      initAuth: async () => {
        const token = getAccessToken();
        if (!token) return set({ user: null });

        set({ loading: true });
        try {
          const profile = await getProfile();
          set({ user: profile });
        } catch (err) {
          clearTokens();
          set({ user: null });
          console.error("Session init failed:", err);
        } finally {
          set({ loading: false });
        }
      },

      // LOGOUT
      logout: () => {
        clearTokens();
        set({ user: null });
      },

      // PROFILE MANAGEMENT
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
    }),

    {
      name: "auth-storage",
      getStorage: () => localStorage,
      partialize: (state) => ({ user: state.user }),
    }
  )
);
