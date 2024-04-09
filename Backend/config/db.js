const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Your MongoDB URI
    const uri = process.env.MONGODB_URI; // It's good practice to keep your configuration details out of your code.

    // Options for the connection
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    };

    // Connecting to MongoDB
    await mongoose.connect(uri, options);

    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;