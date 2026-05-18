const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // Basic Info
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: String,
  location: String,
  
  // Role
  role: { type: String, enum: ["user", "entrepreneur", "admin"], default: "user" },
  
  // Entrepreneur Profile (if role = entrepreneur)
  entrepreneurProfile: {
    businessName: String,
    category: { type: String, enum: ["cobbler", "potter", "tailor", "artisan", "vendor"] },
    bio: String,
    skills: [String],
    experience: String,
    profileImage: String,
    isVerified: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    earnings: { type: Number, default: 0 },
  },
  
  // Address
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  
  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);