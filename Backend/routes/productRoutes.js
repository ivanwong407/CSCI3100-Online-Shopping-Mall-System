// routes/productRoutes.js

const express = require('express');
const router = express.Router();
const { createProduct, getProductById, listAllProducts } = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// POST product at /postProduct - protected route
router.post('/postProduct', protect, createProduct);
router.get('/details/:productID', getProductById);
router.get('/', listAllProducts);


module.exports = router;