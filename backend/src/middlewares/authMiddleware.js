const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

const protectAdmin = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get admin from DB
      const admin = await prisma.admin.findUnique({
        where: { id: decoded.id },
        select: { id: true, username: true } // Don't return password hash
      });

      if (!admin) {
        return res.status(401).json({
          status: 401,
          message: 'Not authorized, admin user not found'
        });
      }

      // Add admin info to request object
      req.admin = admin;
      next();
    } catch (error) {
      console.error('JWT verification error:', error.message);
      return res.status(401).json({
        status: 401,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'Not authorized, no token provided'
    });
  }
};

module.exports = { protectAdmin };
