import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./src/Config/db.js";

import userRoutes from "./src/Routes/userRoute.js";
import productRoutes from "./src/Routes/productRoutes.js";
import billRoutes from "./src/Routes/billRoutes.js";
import dashboardRoutes from "./src/Routes/DashboardRoutes.js";
import lowStockRoutes from "./src/Routes/LowstockRoutes.js";

// ENV CONFIG
dotenv.config();

const app = express();

// ===== MIDDLEWARES =====
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===== ROUTES =====
app.get("/", (req, res) => {
  res.send("🔥 Backend is running");
});

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/low-stock", lowStockRoutes);

// ===== SERVER START =====
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB(); // 🔥 connect once

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
  }
};

startServer();