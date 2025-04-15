// controllers/adminController.js
const Admin = require('../models/User');

// Get all admins
exports.getAllAdmins = async (req, res) => {
    try {
      const admins = await Admin.find({ role: 'admin' }).select('-password');
      res.status(200).json(admins);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching admins', error: err.message });
    }
  };
  

// Get admin by ID
exports.getAdminById = async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.findById(adminId).select('-password');
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching admin', error: err.message });
  }
};