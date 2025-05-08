const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect middleware to authenticate the user
const protect = async (req, res, next) => {
  const token = req.headers.authorization?.startsWith('Bearer') 
    ? req.headers.authorization.split(' ')[1] 
    : null;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next(); // Continue to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};

// Admin middleware to check if the user has admin role
const admin = (req, res, next) => {
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
};

module.exports = { protect, admin };
