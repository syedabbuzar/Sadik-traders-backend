import express from "express";
import cors from "cors";

import connectDB from "../src/Config/db.js";

import userRoutes from "../src/Routes/userRoute.js";
import productRoutes from "../src/Routes/productRoutes.js";
import billRoutes from "../src/Routes/billRoutes.js";
import dashboardRoutes from "../src/Routes/DashboardRoutes.js";
import lowStockRoutes from "../src/Routes/LowstockRoutes.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

// ===== SAFE DB CONNECT =====
let isConnected = false;

const ensureDB = async () => {
  try {
    if (!isConnected) {
      if (!process.env.MONGO_URI) {
        console.log("❌ MONGO_URI missing");
        return;
      }
      await connectDB();
      isConnected = true;
    }
  } catch (err) {
    console.error("❌ DB Crash:", err.message);
  }
};

// ===== ROOT TEST =====
app.get("/", async (req, res) => {
  await ensureDB();
  res.send("🔥 Backend running successfully");
});

// ===== ROUTES =====
app.use("/api/users", async (req, res, next) => {
  await ensureDB();
  next();
}, userRoutes);

app.use("/api/products", async (req, res, next) => {
  await ensureDB();
  next();
}, productRoutes);

app.use("/api/bills", async (req, res, next) => {
  await ensureDB();
  next();
}, billRoutes);

app.use("/api", async (req, res, next) => {
  await ensureDB();
  next();
}, dashboardRoutes);

app.use("/api/low-stock", async (req, res, next) => {
  await ensureDB();
  next();
}, lowStockRoutes);

// ===== GLOBAL ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

export default app;