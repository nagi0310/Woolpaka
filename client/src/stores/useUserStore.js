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
    set({ loading: true });
    try {
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
    } catch (error) {
      set({ isLoading: false });
      return toast.error(error.response?.data?.message || "An error happened");
    }
  },
}));
