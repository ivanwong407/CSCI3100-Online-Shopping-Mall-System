// error_middleware.js

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log to console for the developer
  console.error(err.stack);

  // Set a default status code
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Set status code and return error information
  res.status(statusCode).json({
      message: err.message,
      // Include the stack trace in development mode
      // Remove the stack trace in production mode for security reasons
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = {
  errorHandler,
};