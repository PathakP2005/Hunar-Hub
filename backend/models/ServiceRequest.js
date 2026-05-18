const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema({
  // Customer & Entrepreneur
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: mongoose.Schema.Types.ObjectId, ref: "Service", required: true },
  
  // Request Details
  title: String,
  description: String,
  
  // Pricing
  estimatedPrice: Number,
  finalPrice: Number,
  
  // Dates
  requestedDate: Date,
  completionDate: Date,
  
  // Status
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "in-progress", "completed", "cancelled"],
    default: "pending"
  },
  
  // Location
  serviceLocation: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  
  // Contact
  phone: String,
  
  // Payment
  paymentMethod: { type: String, enum: ["cod", "card", "upi"], default: "cod" },
  isPaid: { type: Boolean, default: false },
  
  // Notes
  customerNotes: String,
  entrepreneurNotes: String,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("ServiceRequest", serviceRequestSchema);
