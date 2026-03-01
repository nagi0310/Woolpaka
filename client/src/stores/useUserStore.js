import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  isLoading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      return toast.error(error.response?.data?.message || "An error happened");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ isLoading: false });
      return toast.error(error.response?.data?.message || "An error happened");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      return toast.error(error.response?.data?.message || "An error happened");
    }
  },

  refreshToken: async () => {
    set({ checkingAuth: true });
    try {
      await axios.post("/auth/recreate-token");
      set({ checkingAuth: false });
    } catch (error) {
      set({ user: null, checkingAuth: false });
      throw error;
    }
  },
}));

// axios interceptors to refresh the access token
let refreshPromise = null;
const SKIP_REFRESH_URLS = ["/auth/recreate-token", "/auth/logout"];

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url || "";
    const shouldSkip = SKIP_REFRESH_URLS.some((p) => url.includes(p));

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkip
    ) {
      originalRequest._retry = true;

      try {
        // if a refresh promise is already in progress, wait for it to complete
        if (refreshPromise) {
          await refreshPromise;
        } else {
          // start a new refresh promise
          refreshPromise = useUserStore.getState().refreshToken();
          await refreshPromise;
          refreshPromise = null;
        }
        return axios(originalRequest);
      } catch (refreshError) {
        refreshPromise = null;
        // Clear user
        useUserStore.setState({ user: null });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
