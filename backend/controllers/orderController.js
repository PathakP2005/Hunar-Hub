const Order = require("../models/Order");
const Product = require("../models/Product");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, deliveryAddress, paymentMethod, notes } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Order must contain items" });
    }
    
    // Validate items
    for (let item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(404).json({ message: `Product ${item.product} not found` });
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }
    
    // Get entrepreneur (assuming first product's entrepreneur)
    const firstProduct = await Product.findById(items[0].product);
    
    const order = await Order.create({
      customer: req.user.id,
      entrepreneur: firstProduct.entrepreneur,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      notes
    });
    
    // Update product stock
    for (let item of items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for current user (customer)
exports.getCustomerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate("items.product")
      .populate("entrepreneur", "name entrepreneurProfile");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get orders for entrepreneur
exports.getEntrepreneurOrders = async (req, res) => {
  try {
    const orders = await Order.find({ entrepreneur: req.user.id })
      .populate("items.product")
      .populate("customer", "name email phone");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single order
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.product")
      .populate("customer", "name email phone")
      .populate("entrepreneur", "name email phone");
    
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // Check authorization
    if (order.customer.toString() !== req.user.id && order.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // Only entrepreneur can update status
    if (order.entrepreneur.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    order.status = status;
    if (status === "delivered") {
      order.isPaid = true;
    }
    
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    
    // Only customer can cancel
    if (order.customer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }
    
    if (order.status !== "pending") {
      return res.status(400).json({ message: "Can only cancel pending orders" });
    }
    
    // Refund stock
    for (let item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }
    
    order.status = "cancelled";
    await order.save();
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order analytics for entrepreneur
exports.getOrderAnalytics = async (req, res) => {
  try {
    const orders = await Order.find({ entrepreneur: req.user.id });
    
    const analytics = {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.totalAmount, 0),
      paidOrders: orders.filter(o => o.isPaid).length,
      pendingOrders: orders.filter(o => o.status === "pending").length,
      completedOrders: orders.filter(o => o.status === "delivered").length
    };
    
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
