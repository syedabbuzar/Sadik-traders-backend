import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productName: String,
  category: String,
  price: Number,
  quantity: Number,
  total: Number,

  grossWeightKg: Number,
  grossWeightGm: Number,
  lessWeightKg: Number,
  lessWeightGm: Number,
  unit: String,
  netWeight: Number,
});

const billSchema = new mongoose.Schema({
  customerName: { type: String, default: "" },
  customerType: { type: String, default: "normal" },

  invoiceNo: { type: String, default: "" },
  invoiceNumber: { type: Number, default: 0 }, 

  mobile: { type: String, default: "" },
  date: { type: String, default: "" },

  hamali: { type: Number, default: 0 },
  roundedOff: { type: Number, default: 0 },

  subtotal: { type: Number, default: 0 },
  total: { type: Number, default: 0 },

  items: [itemSchema],

  paidAmount: { type: Number, default: 0 }, // received payment
  balance: { type: Number, default: 0 }, // total - paidAmount
  status: { type: String, default: "PENDING" }, // PENDING / PAID

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Bill || mongoose.model("Bill", billSchema);