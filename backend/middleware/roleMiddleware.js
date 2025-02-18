const authenticate = require("./authMiddleware"); // JWT validation
const { userType } = require("../models/userModel");

const authorize = (...roles) => {
  return (req, res, next) => {
    const { userType } = req.user; // `req.user` comes from the `authenticate` middleware

    if (!roles.includes(userType)) {
      return res.status(403).json({ message: "Access denied. You do not have the correct role." });
    }

    next();
  };
};

module.exports = authorize;
