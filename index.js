import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "../src/Config/db.js";

import userRoutes from "../src/Routes/userRoute.js";
import productRoutes from "../src/Routes/productRoutes.js";
import billRoutes from "../src/Routes/billRoutes.js";
import dashboardRoutes from "../src/Routes/DashboardRoutes.js";
import lowStockRoutes from "../src/Routes/LowstockRoutes.js";

// Env config
dotenv.config();

const app = express();

// ===== CONNECT DB =====
await connectDB();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("🔥 Backend is running on Vercel");
});

// ===== ROUTES =====
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/low-stock", lowStockRoutes);

// ===== EXPORT FOR VERCEL =====
export default app;