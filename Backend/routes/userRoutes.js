// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { register, login, getMe, listAllUsers } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');


router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe); // New protected route
router.get('/', adminOnly, listAllUsers);

module.exports = router;