const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
  getEntrepreneurServices,
  searchServices,
  createServiceRequest,
  getEntrepreneurServiceRequests,
  updateServiceRequestStatus
} = require("../controllers/serviceController");

// Public routes
router.get("/", getAllServices);
router.get("/search", searchServices);
router.get("/:id", getServiceById);
router.get("/entrepreneur/:entrepreneurId", getEntrepreneurServices);

// Protected routes (entrepreneur)
router.post("/", protect, createService);
router.put("/:id", protect, updateService);
router.delete("/:id", protect, deleteService);

// Service requests
router.post("/request/create", protect, createServiceRequest);
router.get("/requests/entrepreneur", protect, getEntrepreneurServiceRequests);
router.put("/requests/:id/status", protect, updateServiceRequestStatus);

module.exports = router;
