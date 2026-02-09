import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";
export const useProductStore = create((set) => ({
  products: [],

  isLoading: false,
  setProducts: (products) => set({ products }),

  createProduct: async (productData) => {
    set({ isLoading: true });
    try {
      const res = await axios.post("/products", productData);
      set((prev) => ({
        products: [...prev.products, res.data],
        isLoading: false,
      }));
    } catch (error) {
      set({ isLoading: false });
      return toast.error(
        error.response?.data?.message || "An error happenened",
      );
    }
  },

  fetchProductsByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({
        products: res.data,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Failed to fetch products", loading: false });
      return toast.error(
        error.response?.data?.message || "An error happenened",
      );
    }
  },
}));
