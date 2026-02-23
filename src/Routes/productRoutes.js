import express from "express";
import * as controller from "../Controllers/productController.js";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";
import {
  searchProducts,
  getProductById,
} from "../Controllers/productController.js";

const router = express.Router();

// PUBLIC
router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);

// ADMIN
router.post("/", protect, isAdmin, controller.createProduct);
router.put("/:id", protect, isAdmin, controller.updateProduct);
router.delete("/:id", protect, isAdmin, controller.deleteProduct);
router.patch("/:id/stock", protect, isAdmin, controller.addStock);

// ✅ IMPORTANT: SEARCH FIRST
router.get("/search", protect, isAdmin, searchProducts);

// ✅ GET BY ID (always last)
router.get("/:id", protect, isAdmin, getProductById);


export default router;
