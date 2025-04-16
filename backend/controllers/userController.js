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


exports.getUsersByIds = async (req, res) => {
  try {
      const { ids } = req.body; // expects { ids: ['id1', 'id2', ...] }
      console.log("Backend IDs:", ids)

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
          return res.status(400).json({ success: false, message: 'Invalid or empty user ID list.' });
      }

      const users = await User.find({ _id: { $in: ids } });

      return res.status(200).json({ success: true, data: users });
  } catch (error) {
      console.error('Error fetching users by IDs:', error);
      res.status(500).json({ success: false, message: 'Server error' });
  }
};


exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required in the request parameters.',
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};
