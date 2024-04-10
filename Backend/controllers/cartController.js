const Product = require('../models/Product');
const Cart = require('../models/Cart');


const addToCart = async (req, res) => {
  try {
    const productId = req.params.productId;
    const userId = req.user._id; // Assuming you have user info in req.user

    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the product is in stock
    if (product.stock <= 0) {
      return res.status(400).json({ message: 'Product cannot be added to the cart, no stock available' });
    }

    // Add to cart logic here
    // This could be different based on how you handle carts (e.g., in a database, session, etc.)
    // For example, using a Cart model where each user has a cart document:
    const cart = await Cart.findOne({ user: userId });
    if (cart) {
      // Add product to cart and decrease the stock
      cart.items.push(productId);
      product.stock -= 1; // Decrease product stock
      await cart.save();
      await product.save();
    } else {
      // If cart doesn't exist, create a new one
      const newCart = await Cart.create({ user: userId, items: [productId] });
      product.stock -= 1; // Decrease product stock
      await product.save();
    }

    res.status(200).json({ message: 'Product added to cart' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product to cart', error: error });
  }
};