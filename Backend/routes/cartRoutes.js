const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');


router.post('/add-to-cart/:productId', cartController.addToCart);

module.exports = router;