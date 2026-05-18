const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  // Customer & Entrepreneur
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  entrepreneur: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  // Order Items
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: Number,
    price: Number
  }],
  
  // Order Details
  totalAmount: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  
  // Delivery Address
  deliveryAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    phone: String
  },
  
  // Payment
  paymentMethod: { type: String, enum: ["cod", "card", "upi"], default: "cod" },
  isPaid: { type: Boolean, default: false },
  
  // Notes
  notes: String,
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
