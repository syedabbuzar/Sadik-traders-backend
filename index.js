import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/Config/db.js";

import userRoutes from "./src/Routes/userRoute.js";
import productRoutes from "./src/Routes/productRoutes.js";
import billRoutes from "./src/Routes/billRoutes.js";
import dashboardRoutes from "./src/Routes/DashboardRoutes.js";
import lowStockRoutes from "./src/Routes/LowstockRoutes.js";



dotenv.config();

const app = express();

// DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/bills", billRoutes);
app.use("/api", dashboardRoutes);
app.use("/api/low-stock", lowStockRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
