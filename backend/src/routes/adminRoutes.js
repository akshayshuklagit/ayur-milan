const express = require('express');
const router = express.Router();
const { loginLimiter } = require('../middlewares/rateLimiter');
const { protectAdmin } = require('../middlewares/authMiddleware');
const {
  adminLogin,
  getRegistrations,
  getDashboardStats,
  verifyPayment,
  rejectPayment,
  createCoupon,
  getCoupons,
  toggleCouponStatus
} = require('../controllers/adminController');

// Public admin login endpoint (protected by login rate limiting)
router.post('/auth/login', loginLimiter, adminLogin);

// Protected admin endpoints (JWT auth required)
router.get('/registrations', protectAdmin, getRegistrations);
router.get('/stats', protectAdmin, getDashboardStats);
router.post('/registrations/:id/verify', protectAdmin, verifyPayment);
router.post('/registrations/:id/reject', protectAdmin, rejectPayment);
router.post('/coupons', protectAdmin, createCoupon);
router.get('/coupons', protectAdmin, getCoupons);
router.post('/coupons/:id/toggle', protectAdmin, toggleCouponStatus);

module.exports = router;
