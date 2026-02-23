import Product from "../Model/productModel.js";

export const createProduct = async (data) =>
  await Product.create(data);

export const getProducts = async () =>
  await Product.find().sort({ createdAt: -1 });

export const getProductById = async (id) =>
  await Product.findById(id);

export const updateProduct = async (id, data) =>
  await Product.findByIdAndUpdate(id, data, { new: true });

export const deleteProduct = async (id) =>
  await Product.findByIdAndDelete(id);

export const addStock = async (id, qty) =>
  await Product.findByIdAndUpdate(
    id,
    { $inc: { stock: qty } },
    { new: true }
  );
