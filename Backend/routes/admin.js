const express = require('express');
const router = express.Router();
const User = require('../models/user.model'); // Make sure this path is correct
const bcrypt = require('bcryptjs');
// Import any middleware, e.g., for authentication and authorization
const { authMiddleware, adminMiddleware } = require('../middleware/auth.middleware');

// Middleware to protect admin routes
// Make sure to create and import this middleware from the appropriate place in your application
router.use(authMiddleware);
router.use(adminMiddleware);

// Get a list of all users (Admin only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Create a new user (Admin only)
router.post('/users', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Update a user (Admin only)
router.put('/users/:id', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.json(updatedUser);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete a user (Admin only)
router.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted');
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;