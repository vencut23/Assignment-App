const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate users
module.exports = async (req, res, next) => {
  // Get the token from the Authorization header
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID and attach it to the request
    req.user = await User.findById(decoded.user.id).select('-password');
    
    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // Handle invalid or expired token
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
