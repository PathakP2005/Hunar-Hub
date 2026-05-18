const Service = require("../models/Service");
const ServiceRequest = require("../models/ServiceRequest");
const Review = require("../models/Review");

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).populate("entrepreneur", "name entrepreneurProfile");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single service
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("entrepreneur");
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service (entrepreneur only)
exports.createService = async (req, res) => {
  try {
    const { name, description, category, basePrice, availability } = req.body;
    
    if (!name || !basePrice) {
      return res.status(400).json({ message: "Name and basePrice are required" });
    }
    
    const service = await Service.create({
      entrepreneur: req.user.id,
      name,
      description,
      category,
      basePrice,
      availability: availability || {}
    });
    
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    Object.assign(service, req.body);
    await service.save();
    
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    
    if (!service) return res.status(404).json({ message: "Service not found" });
    if (service.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get services by entrepreneur
exports.getEntrepreneurServices = async (req, res) => {
  try {
    const services = await Service.find({ entrepreneur: req.params.entrepreneurId });
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search and filter services
exports.searchServices = async (req, res) => {
  try {
    const { category, minPrice, maxPrice, searchTerm } = req.query;
    
    let filter = { isActive: true };
    
    if (category) filter.category = category;
    if (searchTerm) filter.name = { $regex: searchTerm, $options: "i" };
    if (minPrice || maxPrice) {
      filter.basePrice = {};
      if (minPrice) filter.basePrice.$gte = minPrice;
      if (maxPrice) filter.basePrice.$lte = maxPrice;
    }
    
    const services = await Service.find(filter).populate("entrepreneur", "name entrepreneurProfile");
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create service request
exports.createServiceRequest = async (req, res) => {
  try {
    const { entrepreneur, service, title, description, requestedDate, serviceLocation, phone } = req.body;
    
    const serviceData = await Service.findById(service);
    if (!serviceData) return res.status(404).json({ message: "Service not found" });
    
    const serviceRequest = await ServiceRequest.create({
      customer: req.user.id,
      entrepreneur,
      service,
      title,
      description,
      requestedDate,
      serviceLocation,
      phone,
      estimatedPrice: serviceData.basePrice
    });
    
    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get service requests for entrepreneur
exports.getEntrepreneurServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({ entrepreneur: req.user.id })
      .populate("customer", "name email phone")
      .populate("service");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Accept/Reject service request
exports.updateServiceRequestStatus = async (req, res) => {
  try {
    const { status, finalPrice, entrepreneurNotes } = req.body;
    
    const request = await ServiceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: "Service request not found" });
    if (request.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    request.status = status;
    if (finalPrice) request.finalPrice = finalPrice;
    if (entrepreneurNotes) request.entrepreneurNotes = entrepreneurNotes;
    
    await request.save();
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};