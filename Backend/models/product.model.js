const mongoose = require('mongoose');

// Define product schema fields
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // this field is required
    trim: true      // it will be trimmed automatically
  },
  price: {
    type: Number,
    required: true,
    min: 0           // set a minimum value for the price
  },
  description: {
    type: String,
    required: false  // this field is not required
  },
  category: {
    type: String,
    required: true
  },
  stockQuantity: {
    type: Number,
    required: true,
    min: 0           // minimum stock quantity is 0
  },
  createdAt: {
    type: Date,
    default: Date.now // automatically set the date when a product is created
  }
});

// Compile model from schema
const Product = mongoose.model('Product', productSchema);

module.exports = Product;