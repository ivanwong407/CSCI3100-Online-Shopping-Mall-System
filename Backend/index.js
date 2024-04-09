// index.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// Models
require('./models/user');
require('./models/product');
require('./models/transaction');
require('./models/chat');
require('./models/review');

// Routes
const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const transactionRoutes = require('./routes/transactions');
const chatRoutes = require('./routes/chats');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');

// Initialize the Express app
const app = express();
const port = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // for parsing application/json

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
  console.log("MongoDB database connection established successfully");
}).catch(err => {
  console.error("MongoDB connection error: ", err);
});

// Use Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/transactions', transactionRoutes);
app.use('/chats', chatRoutes);
app.use('/reviews', reviewRoutes);
app.use('/admin', adminRoutes);

// Authentication Middleware - Example of usage if needed
// app.use('/api', auth);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

module.exports = app; // for testing