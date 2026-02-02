import express from "express";
import {
  getCartProducts,
  addToCart,
  removeAllFromCart,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const cartRoutes = express.Router();

cartRoutes.get("/", protectRoute, getCartProducts);
cartRoutes.post("/", protectRoute, addToCart);
cartRoutes.delete("/", protectRoute, removeAllFromCart);
cartRoutes.put("/:id", protectRoute, updateQuantity);
export default cartRoutes;
