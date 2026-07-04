const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

// 1. Admin JWT Login
const adminLogin = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        status: 400,
        message: 'Username and password are required'
      });
    }

    const admin = await prisma.admin.findUnique({
      where: { username }
    });

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid username or password'
      });
    }

    // Sign JWT Token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.status(200).json({
      status: 200,
      message: 'Admin logged in successfully',
      token,
      data: {
        id: admin.id,
        username: admin.username
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Fetch All Registrations with filters & search
const getRegistrations = async (req, res, next) => {
  try {
    const { paymentStatus, verified, search } = req.query;

    const where = {};

    // Filter by paymentStatus
    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    // Filter by verified status
    if (verified !== undefined) {
      where.verified = verified === 'true';
    }

    // Search query matching multiple fields
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { university: { contains: search } },
        { city: { contains: search } },
        { paymentReference: { contains: search } }
      ];
    }

    const registrations = await prisma.registration.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      status: 200,
      count: registrations.length,
      data: registrations
    });
  } catch (error) {
    next(error);
  }
};

// 3. Admin Dashboard Analytics Metrics
const getDashboardStats = async (req, res, next) => {
  try {
    // 1. Total registrations count
    const totalRegistrations = await prisma.registration.count();

    // 2. Revenue (Sum of PAID registrations)
    const paidRegistrations = await prisma.registration.findMany({
      where: { paymentStatus: 'PAID' },
      select: { payableAmount: true }
    });
    const totalRevenue = paidRegistrations.reduce((acc, curr) => acc + curr.payableAmount, 0);

    // 3. Pending UTR Verifications (Unverified and UTR code exists)
    const pendingVerifications = await prisma.registration.count({
      where: {
        verified: false,
        paymentReference: { not: null }
      }
    });

    // 4. Ticket Breakdown counts per Participant Type
    const ugCount = await prisma.registration.count({ where: { participantType: 'UG Scholars & Interns' } });
    const pgCount = await prisma.registration.count({ where: { participantType: 'PG Scholars / Ph.D / Practitioner' } });
    const otherCount = await prisma.registration.count({ where: { participantType: 'Other Indian Delegates' } });

    // 5. Payment statuses breakdown
    const statusPending = await prisma.registration.count({ where: { paymentStatus: 'PENDING' } });
    const statusPaid = await prisma.registration.count({ where: { paymentStatus: 'PAID' } });
    const statusFailed = await prisma.registration.count({ where: { paymentStatus: 'FAILED' } });

    return res.status(200).json({
      status: 200,
      data: {
        metrics: {
          totalRegistrations,
          totalRevenue,
          pendingVerifications,
          activeCouponsCount: await prisma.coupon.count({ where: { isActive: true } })
        },
        ticketBreakdown: {
          ugCount,
          pgCount,
          otherCount
        },
        paymentStatusBreakdown: {
          pending: statusPending,
          paid: statusPaid,
          failed: statusFailed
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// 4. Approve Payment (Verify UTR code)
const verifyPayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const registration = await prisma.registration.findUnique({
      where: { id }
    });

    if (!registration) {
      return res.status(404).json({
        status: 404,
        message: 'Registration not found'
      });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        verified: true,
        paymentStatus: 'PAID'
      }
    });

    // Send confirmation email asynchronously
    const emailService = require('../services/emailService');
    emailService.sendRegistrationConfirmedEmail(updated).catch(err => {
      console.error('Failed to send verification email from admin controller:', err);
    });

    return res.status(200).json({
      status: 200,
      message: 'Payment verified and ticket marked as PAID successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// 5. Reject Payment (Invalid UTR code)
const rejectPayment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const registration = await prisma.registration.findUnique({
      where: { id }
    });

    if (!registration) {
      return res.status(404).json({
        status: 404,
        message: 'Registration not found'
      });
    }

    const updated = await prisma.registration.update({
      where: { id },
      data: {
        verified: false,
        paymentStatus: 'FAILED'
      }
    });

    return res.status(200).json({
      status: 200,
      message: 'Payment rejected and UTR marked as FAILED successfully',
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

// 6. Create discount coupon code
const createCoupon = async (req, res, next) => {
  try {
    const { code, discountType, value } = req.body;

    if (!code || !discountType || value === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'code, discountType ("PERCENT" or "FIXED"), and value are required'
      });
    }

    if (discountType !== 'PERCENT' && discountType !== 'FIXED') {
      return res.status(400).json({
        status: 400,
        message: 'discountType must be either PERCENT or FIXED'
      });
    }

    const uppercaseCode = code.toUpperCase();

    // Check code duplication
    const existing = await prisma.coupon.findUnique({
      where: { code: uppercaseCode }
    });

    if (existing) {
      return res.status(400).json({
        status: 400,
        message: `Coupon code '${uppercaseCode}' already exists`
      });
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: uppercaseCode,
        discountType,
        value: parseFloat(value),
        isActive: true
      }
    });

    return res.status(201).json({
      status: 201,
      message: 'Coupon code created successfully',
      data: coupon
    });
  } catch (error) {
    next(error);
  }
};

// 7. Get All Coupons
const getCoupons = async (req, res, next) => {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      status: 200,
      data: coupons
    });
  } catch (error) {
    next(error);
  }
};

// 8. Toggle Coupon Active state
const toggleCouponStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const coupon = await prisma.coupon.findUnique({
      where: { id }
    });

    if (!coupon) {
      return res.status(404).json({
        status: 404,
        message: 'Coupon not found'
      });
    }

    const updated = await prisma.coupon.update({
      where: { id },
      data: {
        isActive: !coupon.isActive
      }
    });

    return res.status(200).json({
      status: 200,
      message: `Coupon status toggled to ${updated.isActive ? 'ACTIVE' : 'INACTIVE'}`,
      data: updated
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  adminLogin,
  getRegistrations,
  getDashboardStats,
  verifyPayment,
  rejectPayment,
  createCoupon,
  getCoupons,
  toggleCouponStatus
};
