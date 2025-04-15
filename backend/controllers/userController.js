const User = require('../models/User');

// Controller to list name, email, and user ID for all client accounts
exports.listClientMentionedRoles = async (req, res) => {
  try {
    // Query to find all users with role 'client' and select specific fields
    const clientUsers = await User.find({ role: 'client' })

    // Send response with the list of client accounts
    res.status(200).json({
      success: true,
      data: clientUsers
     
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving client accounts',
      error: error.message,
    });
  }
};