const express = require('express');
const router = express.Router();
const { apiLimiter } = require('../middlewares/rateLimiter');
const {
  verifyCoupon,
  registerParticipant,
  submitPaymentUTR,
  getPaymentConfig,
  submitContact,
  submitAbstract,
  submitExhibitor,
  getExhibitorLogos
} = require('../controllers/registrationController');

// All public registration endpoints are protected by api rate limiting
router.get('/payment-config', apiLimiter, getPaymentConfig);
router.get('/exhibitor-logos', apiLimiter, getExhibitorLogos);
router.post('/verify-coupon', apiLimiter, verifyCoupon);
router.post('/register', apiLimiter, registerParticipant);
router.post('/submit-utr', apiLimiter, submitPaymentUTR);

// Public form submission endpoints
router.post('/submit-contact', apiLimiter, submitContact);
router.post('/submit-abstract', apiLimiter, submitAbstract);
router.post('/submit-exhibitor', apiLimiter, submitExhibitor);

module.exports = router;
