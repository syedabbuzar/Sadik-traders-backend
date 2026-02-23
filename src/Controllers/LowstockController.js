// controllers/lowStockController.js
import * as lowStockService from "../Services/LowstockService.js";

// 📥 GET Low Stock
export const getLowStockController = async (req, res) => {
  try {
    const products = await lowStockService.getLowStockProducts();

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 📤 UPDATE Stock
export const updateStockController = async (req, res) => {
  try {
    const { id } = req.params;
    const { qty } = req.body;

    if (!qty || qty <= 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be greater than 0"
      });
    }

    const updatedProduct = await lowStockService.updateProductStock(id, qty);

    res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};