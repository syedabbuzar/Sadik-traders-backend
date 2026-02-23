// routes/dashboardRoutes.js
import express from "express";
import { getDashboard } from "../Controllers/DashboardControllers.js";

const router = express.Router();

router.get("/dashboard", getDashboard);

export default router;