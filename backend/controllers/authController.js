// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Check if email exists
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select('_id');
    
    res.status(200).json({
      exists: !!user,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error checking email',
    });
  }
};

// Register with email and password
exports.register = async (req, res) => {
  try {
    const { name, email, password, howHeard, occupation } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: 'Email already registered',
      });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      howHeard: howHeard || '',
      occupation: occupation || '',
    });
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Registration failed',
    });
  }
};

// Register/login with Google (for signup flow)
exports.googleAuth = async (req, res) => {
  try {
    const { email, name, googleId, howHeard, occupation } = req.body;
    
    // Check if user exists with this googleId
    let user = await User.findOne({ googleId });
    
    if (!user) {
      // Check if email exists (but with different auth method)
      user = await User.findOne({ email });
      
      if (user) {
        return res.status(400).json({
          message: 'Email already registered with different method',
        });
      }
      
      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        howHeard: howHeard || '',
        occupation: occupation || '',
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Google authentication failed',
    });
  }
};

// Login with email and password
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Invalid credentials',
      });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Login failed',
    });
  }
};

// Login with Google (for login flow)
exports.googleLogin = async (req, res) => {
  try {
    const { googleId, email } = req.body;

    // Check if user exists with this googleId
    const user = await User.findOne({ googleId });
    
    if (!user) {
      // Optionally check by email, but only if linked to Google
      const emailUser = await User.findOne({ email });
      if (!emailUser || !emailUser.googleId) {
        return res.status(401).json({
          message: 'No account found with this Google ID',
        });
      }
      // If email exists but googleId doesn't match, it's a different auth method
      if (emailUser.googleId !== googleId) {
        return res.status(400).json({
          message: 'Email registered with different method',
        });
      }
    }

    // Generate token
    const token = generateToken(user._id);
    
    res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Google login failed',
    });
  }
};