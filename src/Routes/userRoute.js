import express from "express";
import { protect } from "../Middleware/authMiddleware.js";
import {
  registerUser,
  loginUser,
  getProfile,
  allUsers,
  createAdmin,
} from "../Controllers/userController.js";

const router = express.Router();

// -------------------- PUBLIC ROUTES --------------------
router.post("/register", registerUser); // normal user or admin email
router.post("/login", loginUser);

// -------------------- PROTECTED ROUTES --------------------
router.get("/profile", protect, getProfile);

// -------------------- ADMIN ROUTES --------------------
router.get("/admin/users", protect, allUsers);
router.post("/admin/create", protect, createAdmin);

export default router;