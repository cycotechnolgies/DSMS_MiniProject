const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];  // "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    req.user = user;  // Attach user info (including userType) to request object
    next();
  });
};

module.exports = authenticateToken;
