const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Product Details
  name: { type: String, required: true },
  description: String,
  category: { type: String, enum: ["cobbler", "potter", "tailor", "artisan", "vendor"], required: true },
  
  // Pricing & Inventory
  price: { type: Number, required: true },
  discountPrice: Number,
  stock: { type: Number, default: 0 },
  
  // Images & Media
  images: [String],
  
  // Ratings & Reviews
  averageRating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  
  // Status
  isActive: { type: Boolean, default: true },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Product", productSchema);
