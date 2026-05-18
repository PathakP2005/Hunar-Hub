const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  // Reviewer & Target
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // What is being reviewed
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  serviceRequest: { type: mongoose.Schema.Types.ObjectId, ref: "ServiceRequest" },
  
  // Review Content
  rating: { type: Number, min: 1, max: 5, required: true },
  title: String,
  comment: String,
  
  // Review Status
  isVerified: { type: Boolean, default: false },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
