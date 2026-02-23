// routes/lowStockRoutes.js
import express from "express";
import {
  getLowStockController,
  updateStockController
} from "../Controllers/LowstockController.js";

import { protect, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// 🔻 Get Low Stock
router.get("/", protect, getLowStockController);

// 🔺 Restock (only admin)
router.put("/:id", protect, isAdmin, updateStockController);

export default router;