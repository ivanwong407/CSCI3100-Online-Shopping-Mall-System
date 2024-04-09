const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/user_model');
const { registerUser } = require('./register_controller'); // Assuming you've separated this into its own file
const authMiddleware = require('../middleware/auth_middleware');

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    res.status(400).json({ error: 'Please provide an email and password' });
    return;
  }

  // Check for user by email
  const user = await User.findOne({ email });

  // Check if user exists and password matches
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      token: generateToken(user._id),
      userId: user._id
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  // User is added to the req object by the authMiddleware
  const user = req.user;
  
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  res.json({
    userId: user._id,
    username: user.username,
    // Include any other user details you want to return
  });
});

// Utility function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser, // Make sure this is defined in another file or add the implementation here
  loginUser,
  getUserProfile
};
