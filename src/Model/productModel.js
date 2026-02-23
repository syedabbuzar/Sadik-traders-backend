import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "general",
      trim: true,
      index: true,
    },

    code: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    normalPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    retailerPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    buyingPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    stock: {
      type: Number,
      default: 0,
      min: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Text search
productSchema.index({
  name: "text",
  category: "text",
  code: "text",
});

export default mongoose.model("Product", productSchema);
