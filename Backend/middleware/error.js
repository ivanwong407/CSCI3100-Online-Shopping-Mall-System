// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
    // Set the status code
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
  
    // Log the error for the server's records but don't send stack traces to clients.
    console.error(err);
  
    // Respond with error message
    // In production, you might not want to disclose certain types of errors to the client.
    // You can modify the response based on the environment or error type.
    res.json({
      message: err.message,
      // If in development, include stack trace (not in production)
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
  };
  
  module.exports = errorMiddleware;