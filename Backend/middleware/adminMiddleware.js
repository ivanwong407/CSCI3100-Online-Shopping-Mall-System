const jwt = require('jsonwebtoken');

const adminOnly = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.userType !== 'admin') {
      throw new Error('Not authorized as admin');
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "You do not have permission to perform this action" });
  }
};




module.exports ={adminOnly};