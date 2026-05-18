const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getUserProfile,
  getEntrepreneurProfile,
  updateUserProfile,
  updateEntrepreneurProfile,
  getAllEntrepreneurs,
  searchEntrepreneurs
} = require("../controllers/userController");

// User routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Entrepreneur routes
router.get("/entrepreneurs", getAllEntrepreneurs);
router.get("/entrepreneurs/search", searchEntrepreneurs);
router.get("/entrepreneurs/:id", getEntrepreneurProfile);
router.put("/become-entrepreneur", protect, updateEntrepreneurProfile);

module.exports = router;