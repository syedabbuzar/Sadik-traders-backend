import Product from "../Model/productModel.js";

// CREATE
export const createProduct = async (data) => Product.create(data);

// GET ALL
export const getProducts = async () => Product.find().sort({ createdAt: -1 });

// GET BY ID
export const getProductById = async (id) => Product.findById(id);

// UPDATE
export const updateProduct = async (id, data) =>
  Product.findByIdAndUpdate(id, data, { new: true });

// DELETE
export const deleteProduct = async (id) => Product.findByIdAndDelete(id);

// ADD STOCK (KG + Gram support)
export const addStock = async (id, { kg = 0, gm = 0 }) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");

  let totalGm = product.stockGm + gm;
  let extraKg = Math.floor(totalGm / 1000);
  let remainingGm = totalGm % 1000;

  const updatedKg = product.stockKg + kg + extraKg;

  product.stockKg = updatedKg;
  product.stockGm = remainingGm;

  await product.save();
  return product;
};