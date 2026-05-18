const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getEntrepreneurProducts,
  searchProducts
} = require("../controllers/productController");

// Public routes
router.get("/", getAllProducts);
router.get("/search", searchProducts);
router.get("/:id", getProductById);
router.get("/entrepreneur/:entrepreneurId", getEntrepreneurProducts);

// Protected routes (entrepreneur only)
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
