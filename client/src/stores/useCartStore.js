import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,

  getCartItems: async () => {
    try {
      const res = await axios("/cart");
      set({ cart: res.data });
    } catch (error) {
      set({ cart: [] });
      return toast.error(
        error.response?.data?.message || "An error happenened",
      );
    }
  },
}));
