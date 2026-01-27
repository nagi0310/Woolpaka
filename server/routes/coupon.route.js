import express from "express";
import { addCoupon } from "../controllers/coupon.controller.js";

const couponRoutes = express.Router();

couponRoutes.post("/", addCoupon);

export default couponRoutes;
