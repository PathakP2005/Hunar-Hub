const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password, role = "user" } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "User registered successfully", userId: user._id });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );

      res.json({ 
        message: "Login successful", 
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get entrepreneur profile
const getEntrepreneurProfile = async (req, res) => {
  try {
    const entrepreneur = await User.findById(req.params.id).select("-password");
    if (!entrepreneur) return res.status(404).json({ message: "Entrepreneur not found" });
    if (entrepreneur.role !== "entrepreneur") {
      return res.status(400).json({ message: "This user is not an entrepreneur" });
    }
    res.json(entrepreneur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const { name, phone, location, address } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (address) user.address = address;
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create/Update entrepreneur profile
const updateEntrepreneurProfile = async (req, res) => {
  try {
    const { businessName, category, bio, skills, experience, profileImage } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    
    user.role = "entrepreneur";
    user.entrepreneurProfile = {
      businessName: businessName || user.entrepreneurProfile?.businessName,
      category: category || user.entrepreneurProfile?.category,
      bio: bio || user.entrepreneurProfile?.bio,
      skills: skills || user.entrepreneurProfile?.skills || [],
      experience: experience || user.entrepreneurProfile?.experience,
      profileImage: profileImage || user.entrepreneurProfile?.profileImage
    };
    
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all entrepreneurs
const getAllEntrepreneurs = async (req, res) => {
  try {
    const { category } = req.query;
    
    let filter = { role: "entrepreneur" };
    if (category) filter["entrepreneurProfile.category"] = category;
    
    const entrepreneurs = await User.find(filter).select("-password");
    res.json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search entrepreneurs
const searchEntrepreneurs = async (req, res) => {
  try {
    const { searchTerm, category, minRating } = req.query;
    
    let filter = { role: "entrepreneur" };
    
    if (searchTerm) {
      filter.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { "entrepreneurProfile.businessName": { $regex: searchTerm, $options: "i" } }
      ];
    }
    
    if (category) filter["entrepreneurProfile.category"] = category;
    if (minRating) filter["entrepreneurProfile.averageRating"] = { $gte: minRating };
    
    const entrepreneurs = await User.find(filter).select("-password");
    res.json(entrepreneurs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser,
  getUserProfile,
  getEntrepreneurProfile,
  updateUserProfile,
  updateEntrepreneurProfile,
  getAllEntrepreneurs,
  searchEntrepreneurs
};