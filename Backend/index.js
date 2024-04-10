require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // Assuming you have a file for DB connection
const userRoutes = require('./routes/user_routes'); // Your user routes file
const { errorHandler } = require('./middleware/error_middleware'); // An error handling middleware
const cors = require('cors');

const app = express(); // Move this line before using `app`
app.use(cors()); // Now `app` is defined and you can use it

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware for parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/user', require('./routes/user_routes.js'))

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));