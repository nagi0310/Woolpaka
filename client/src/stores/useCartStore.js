import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";
export const useCartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,

  getCartItems: async () => {
    try {
      const res = await axios.get("/cart");
      set({ cart: res.data });
      get().calculateTotals();
    } catch (error) {
      console.log(error);
      set({ cart: [] });
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in getting cart items",
      );
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart", { productId: product._id });
      toast.success("Product added");
      set((prevState) => {
        // check if item existing in cart
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id,
        );
        // if existing, add quantity by 1 otherwise add to the cart
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      console.log(error);
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in adding products",
      );
    }
  },

  removeFromCart: async (productId) => {
    try {
      await axios.delete("/cart", { data: { productId } });
      set((prevState) => ({
        cart: prevState.cart.filter((item) => item._id !== productId),
      }));
      get().calculateTotals();
      toast.success("Product deleted");
    } catch (error) {
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in remove from cart",
      );
    }
  },

  updateQuantity: async (productId, quantity) => {
    try {
      if (quantity === 0) {
        await get().removeFromCart(productId);
        return;
      }
      await axios.put(`/cart/${productId}`, { quantity });
      set((prevState) => ({
        cart: prevState.cart.map((item) =>
          item._id === productId ? { ...item, quantity: quantity } : item,
        ),
      }));

      get().calculateTotals();
      toast.success("Cart updated");
    } catch (error) {
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in update quantity",
      );
    }
  },

  clearCart: () => {
    set({ cart: [], coupon: null, total: 0, subtotal: 0 });
  },

  getMyCoupon: async () => {
    try {
      const res = await axios.get("/coupons");
      set({ coupon: res.data });
    } catch (error) {
      console.log("Error fetching coupon", error);
    }
  },

  applyCoupon: async (code) => {
    try {
      const res = await axios.post("/coupons/validate", { code });
      set({ coupon: res.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon applied success");
    } catch (error) {
      return toast.error(
        error.response?.data?.message ||
          "An error happenened in applying coupon",
      );
    }
  },

  removeCoupon: () => {
    set({ coupon: null, isCouponApplied: false });
    get().calculateTotals();
    toast.success("Coupon removed");
  },

  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    console.log(subtotal);
    let total = subtotal;
    if (coupon) {
      // Is divide by 100 necessary
      const discount = (subtotal * coupon.discountPercentage) / 100;
      total -= discount;
    }
    set({ subtotal, total });
  },
}));
