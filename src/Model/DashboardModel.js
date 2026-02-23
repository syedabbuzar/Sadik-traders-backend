

// models/dashboardModel.js
import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
  totalProducts: Number,
  totalStock: Number,
  lowStockItems: Number,
  totalCustomers: Number,

  todayBills: Number,

  totalRevenue: Number,
  normalCustomerRevenue: Number,
  retailerCustomerRevenue: Number,

  todayRevenue: Number,
  todayBillsGenerated: Number,

  recentBills: [
    {
      billNo: String,
      customerName: String,
      customerType: {
        type: String,
        enum: ["normal", "retailer"]
      },
      date: String,
      total: Number
    }
  ]
}, { timestamps: true });

export default mongoose.model("Dashboard", dashboardSchema);