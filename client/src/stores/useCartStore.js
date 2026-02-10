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
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      set({ cart: [] });
      return toast.error(
        error.response?.data?.message || "An error happenened",
      );
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added");
      // set((prevState) => {
      //   console.log(prevState.cart);
      //   // check if item existing in cart
      //   const existingItem = prevState.cart.find(
      //     (item) => item._id === product._id,
      //   );
      //   // if existing, add quantity by 1 otherwise add to the cart
      //   const newCart = existingItem
      //     ? prevState.cart.map((item) =>
      //         item._id === product._id
      //           ? { ...item, quantity: item.quantity + 1 }
      //           : item,
      //       )
      //     : [...prevState.cart, { ...product, quantity: 1 }];
      //   return { cart: newCart };
      // });
      // get().calculateTotals();
      get().getCartItems();
    } catch (error) {
      console.log(error);
      return toast.error(
        error.response?.data?.message || "An error happenened",
      );
    }
  },

  removeFromCart: async (product) => {
    try {
      await axios.delete("/cart", { productId: product._id });
      toast.success("Product deleted");
      get().getCartItems();
    } catch (error) {
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in remove from cart",
      );
    }
  },

  updateQuantity: async (product) => {},

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    let total = subtotal;
    if (coupon) {
      // Is divide by 100 necessary
      const discount = (subtotal * coupon.discountPercentage) / 100;
      total -= discount;
    }
    set({ subtotal, total });
  },
}));
