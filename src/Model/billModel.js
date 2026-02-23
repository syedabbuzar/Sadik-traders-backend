import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  productName: { type: String, required: true, trim: true },

  category: { type: String, default: "general" }, // ✅ NEW

  price: { type: Number, required: true },

  quantity: {
    type: Number,
    required: true,
    min: 1,
  },

  total: { type: Number, required: true },
});

const billSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    customerType: {
      type: String,
      enum: ["normal", "retailer"],
      default: "normal",
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    items: {
      type: [itemSchema],
      required: true,
    },

    subtotal: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Bill", billSchema);
