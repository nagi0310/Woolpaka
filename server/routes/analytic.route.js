import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAnalytics } from "../controllers/analytic.controller.js";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/", protectRoute, adminRoute, getAnalytics);

export default analyticsRoutes;
