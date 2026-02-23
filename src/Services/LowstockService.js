// services/lowStockService.js
import Product from "../Model/productModel.js";

// 🔻 Get low stock products
export const getLowStockProducts = async () => {
  return await Product.find({ stock: { $lte: 10 } })
    .sort({ stock: 1 });
};

// 🔺 Update stock (Restock)
export const updateProductStock = async (productId, qty) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new Error("Product not found");
  }

  product.stock += qty;

  await product.save();

  return product;
};