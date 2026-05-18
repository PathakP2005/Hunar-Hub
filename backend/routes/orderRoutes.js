const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  createOrder,
  getCustomerOrders,
  getEntrepreneurOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
  getOrderAnalytics
} = require("../controllers/orderController");

// Protected routes
router.post("/", protect, createOrder);
router.get("/", protect, getCustomerOrders);
router.get("/entrepreneur/orders", protect, getEntrepreneurOrders);
router.get("/entrepreneur/analytics", protect, getOrderAnalytics);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);

module.exports = router;
