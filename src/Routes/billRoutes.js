import express from "express";
import {
  createNewBill,
  fetchBills,
  fetchBill,
  removeBill,
  editBill, // ✅ added
} from "../Controllers/billController.js";
import { protect, isAdmin } from "../Middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, isAdmin, createNewBill);
router.get("/", protect, isAdmin, fetchBills);
router.get("/:id", protect, isAdmin, fetchBill);
router.put("/:id", protect, isAdmin, editBill); // ✅ NEW UPDATE ROUTE
router.delete("/:id", protect, isAdmin, removeBill);

export default router;