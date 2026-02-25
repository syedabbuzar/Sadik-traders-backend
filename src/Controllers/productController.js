import mongoose from "mongoose";
import * as service from "../Services/productService.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    let data = req.body;
    if (!data.retailerPrice || data.retailerPrice == 0) data.retailerPrice = data.normalPrice;
    const product = await service.createProduct(data);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ALL
export const getProducts = async (req, res) => {
  try {
    const products = await service.getProducts();
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// GET ONE
export const getProduct = async (req, res) => {
  try {
    const product = await service.getProductById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// UPDATE
export const updateProduct = async (req, res) => {
  try {
    let data = req.body;
    if ((!data.retailerPrice || data.retailerPrice == 0) && data.normalPrice) data.retailerPrice = data.normalPrice;
    const product = await service.updateProduct(req.params.id, data);
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    await service.deleteProduct(req.params.id);
    res.json({ msg: "Product deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ADD STOCK (KG + Gram)
export const addStock = async (req, res) => {
  try {
    const { kg = 0, gm = 0 } = req.body;
    const product = await service.addStock(req.params.id, { kg, gm });
    res.json(product);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// SEARCH
export const searchProducts = async (req, res) => {
  try {
    const { q, category } = req.query;
    let filter = {};
    if (q && q.trim() !== "") filter.name = { $regex: q.trim(), $options: "i" };
    if (category && category.trim() !== "") filter.category = category.trim();

    const products = await Product.find(filter)
      .select("name category normalPrice retailerPrice stockKg stockGm")
      .limit(20)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SAFE GET BY ID
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ msg: "Invalid Product ID" });
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};