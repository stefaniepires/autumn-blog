const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('Received Token:', token);
  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.auth = decoded;
    next();
} catch (err) {
    console.error('JWT Verification Error:', err.message);
    return res.status(401).json({ message: 'Token is not valid' });
}
};

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.auth.role)) {
      return res.status(403).json({ message: 'Access denied: You do not have the required role.' });
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorizeRoles,
};
