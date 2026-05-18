const Product = require("../models/Product");
const Review = require("../models/Review");

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("entrepreneur", "name entrepreneurProfile");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single product
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("entrepreneur");
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create product (entrepreneur only)
exports.createProduct = async (req, res) => {
  try {
    const { name, description, category, price, stock, images } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required" });
    }
    
    const product = await Product.create({
      entrepreneur: req.user.id,
      name,
      description,
      category,
      price,
      stock,
      images
    });
    
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    Object.assign(product, req.body);
    await product.save();
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) return res.status(404).json({ message: "Product not found" });
    if (product.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get products by entrepreneur
exports.getEntrepreneurProducts = async (req, res) => {
  try {
    const products = await Product.find({ entrepreneur: req.params.entrepreneurId });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search and filter products
exports.searchProducts = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, searchTerm } = req.query;
    
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (searchTerm) filter.name = { $regex: searchTerm, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = minPrice;
      if (maxPrice) filter.price.$lte = maxPrice;
    }
    
    const products = await Product.find(filter).populate("entrepreneur", "name entrepreneurProfile");
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};