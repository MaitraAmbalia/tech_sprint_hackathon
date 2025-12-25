const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      // For the Hackathon Mock: We can just trust the token or verify a simple secret
      // const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the ID in the token
      // req.user = await User.findById(decoded.id).select('-password');
      
      // MOCK BYPASS (Remove this and uncomment above for real Auth)
      // We will assume the user ID is sent in headers for simplicity in testing if you haven't set up full JWT yet
      // But standard practice is JWT:
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'mysecret'); 
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };