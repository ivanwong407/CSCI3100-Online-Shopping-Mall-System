// controllers/productController.js

const Product = require('../models/productModel');


// POST a new product
const createProduct = async (req, res) => {
  const { name, price, category, description, stock } = req.body;

  if (!name || !price || !category || !description || !stock) {
    return res.status(400).json({ message: 'Please include all fields' });
  }

  const product = new Product({
    user: req.user._id, // from the authMiddleware
    name,
    price,
    category,
    description,
    stock
  });

  try {
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error saving product' });
  }
};
// controllers/productController.js


// GET a single product by ID
const getProductById = async (req, res) => {
    try {
      // The product_id is read from the URL and used to find the product
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      // If the product_id format is not valid ObjectId format, return a 400 error
      if (error.kind === 'ObjectId') {
        return res.status(400).json({ message: 'Invalid product ID' });
      }
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  const listAllProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
  


const deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      await product.remove();
      res.json({ message: 'Product removed' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


module.exports = {
  createProduct,
  getProductById,
  listAllProducts,
  deleteProduct
};