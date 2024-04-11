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
  const productID = req.params.id; // Assuming the product ID is passed as a route parameter

  try {
    // Find the product by ID
    const product = await Product.findById(productID);

    if (product) {
      // If the product is found, return it
      return res.json(product);
    } else {
      // If the product is not found, search the product list
      const productList = await Product.find({});

      const matchedProduct = productList.find(
        (p) => p.name.toLowerCase().includes(productID.toLowerCase()) || // Search by name
          p.description.toLowerCase().includes(productID.toLowerCase()) || // Search by description
          p.category.toLowerCase().includes(productID.toLowerCase()) // Search by category
      );

      if (matchedProduct) {
        // If a matching product is found in the list, return it
        return res.json(matchedProduct);
      } else {
        // If no matching product is found, return null
        return res.status(404).json({ message: 'Product not found' });
      }
    }
  } catch (error) {
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