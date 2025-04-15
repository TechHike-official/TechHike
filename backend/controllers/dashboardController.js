const User = require('../models/User');
const Project = require('../models/Project');
const Payment = require('../models/Payment');

// Controller to fetch dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    // Fetch all stats concurrently for better performance
    const [totalProjects, pendingPayments, totalClients] = await Promise.all([
      Project.countDocuments(),              // Total number of projects
      Payment.countDocuments({ status: 'pending' }), // Pending payments
      User.countDocuments({ role: 'client' }),      // Total clients
    ]);

    // Structure the response
    const stats = {
      totalProjects,
      pendingPayments,
      totalClients,
    };

    // Send response
    res.status(200).json({
      success: true,
      data: stats,
      message: 'Dashboard statistics retrieved successfully',
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard statistics',
      error: error.message,
    });
  }
};