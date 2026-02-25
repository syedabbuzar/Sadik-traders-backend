import express from "express";
import * as controller from "../Controllers/productController.js";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.get("/", controller.getProducts);
router.get("/:id", controller.getProduct);

// ADMIN
router.post("/", protect, isAdmin, controller.createProduct);
router.put("/:id", protect, isAdmin, controller.updateProduct);
router.delete("/:id", protect, isAdmin, controller.deleteProduct);
router.patch("/:id/stock", protect, isAdmin, controller.addStock);

// SEARCH
router.get("/search", protect, isAdmin, controller.searchProducts);

export default router;