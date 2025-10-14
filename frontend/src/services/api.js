import axios from "axios";
import { refreshToken } from "./tokenService";

const api = axios.create({ baseURL: import.meta.env.VITE_BASE_URL})

// Request interceptor for adding the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) =>  response,
  async (error) => {
    let originalRequest = error.config // return successful response

    // If unauthorized AND haven't retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // prevent infinite loops

      try {
        const res = await refreshToken()

        // save new access token
        const newToken = res.access
        localStorage.setItem("access_token", newToken);

        // update the headers and retry failed request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest)
      } catch (error) {
        console.error("Token refresh failed:", error);
        // clear tokens and redirect to login
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
        
    // If not 401 or refresh fails, reject error normally
    return Promise.reject(error);
  }
);

export default api