const prisma = require('../config/db');
const crypto = require('crypto');
const emailService = require('../services/emailService');

// Price mappings matching registration options
const PARTICIPANT_PRICES = {
  'UG Scholars & Interns': 1599,
  'PG Scholars / Ph.D / Practitioner': 1999,
  'Other Indian Delegates': 2199
};

const ACCOMMODATION_PRICES = {
  'Triple Sharing': 1500,
  'Double Sharing': 3000,
  'Single Room': 4500,
  'None': 0
};

// 1. Verify Coupon Code
const verifyCoupon = async (req, res, next) => {
  try {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({
        status: 400,
        message: 'Coupon code is required'
      });
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon || !coupon.isActive) {
      return res.status(404).json({
        status: 404,
        message: 'Invalid or inactive coupon code'
      });
    }

    return res.status(200).json({
      status: 200,
      message: 'Coupon validated successfully',
      data: {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value
      }
    });
  } catch (error) {
    next(error);
  }
};

// 2. Register Participant (Calculates final payable amount & inserts DB)
const registerParticipant = async (req, res, next) => {
  try {
    const {
      participantType,
      name,
      email,
      phone,
      gender,
      university,
      city,
      whatsapp,
      state,
      designation,
      couponCode,
      coordinatorName,
      accommodationType = 'None'
    } = req.body;

    // Basic required validations
    if (!participantType || !name || !email || !phone || !gender || !university || !city) {
      return res.status(400).json({
        status: 400,
        message: 'All fields (participantType, name, email, phone, gender, university, city) are required'
      });
    }

    // Pricing checks
    const registrationFee = PARTICIPANT_PRICES[participantType];
    if (registrationFee === undefined) {
      return res.status(400).json({
        status: 400,
        message: `Invalid participant type. Options: ${Object.keys(PARTICIPANT_PRICES).join(', ')}`
      });
    }

    const accommodationFee = ACCOMMODATION_PRICES[accommodationType];
    if (accommodationFee === undefined) {
      return res.status(400).json({
        status: 400,
        message: `Invalid accommodation type. Options: ${Object.keys(ACCOMMODATION_PRICES).join(', ')}`
      });
    }

    // Pricing calculation
    const baseTotal = registrationFee + accommodationFee;
    let discount = 0;

    // Validate and apply coupon if provided
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() }
      });

      if (coupon && coupon.isActive) {
        if (coupon.discountType === 'PERCENT') {
          // Percent discount applied on overall total
          discount = Math.round(baseTotal * (coupon.value / 100));
        } else if (coupon.discountType === 'FIXED') {
          // Flat rate discount
          discount = coupon.value;
        }
      }
    }

    // Safeguard against discount exceeding total price
    if (discount > baseTotal) {
      discount = baseTotal;
    }

    const payableAmount = baseTotal - discount;

    // Create database registration record
    const registration = await prisma.registration.create({
      data: {
        participantType,
        name,
        email,
        phone,
        gender,
        university,
        city,
        whatsapp,
        state,
        designation,
        couponCode: couponCode ? couponCode.toUpperCase() : null,
        coordinatorName,
        accommodationType,
        registrationFee,
        accommodationFee,
        discount,
        payableAmount,
        paymentStatus: 'PENDING',
        verified: false
      }
    });

    // Send automated pending registration email asynchronously (non-blocking)
    emailService.sendRegistrationPendingEmail(registration).catch(err => {
      console.error('Failed to send registration pending email:', err);
    });

    return res.status(201).json({
      status: 201,
      message: 'Registration created successfully. Please submit payment UTR to confirm.',
      data: registration
    });
  } catch (error) {
    next(error);
  }
};

// 3. Submit UTR / Payment Reference Code
const submitPaymentUTR = async (req, res, next) => {
  try {
    const { registrationId, paymentReference } = req.body;

    if (!registrationId || !paymentReference) {
      return res.status(400).json({
        status: 400,
        message: 'registrationId and paymentReference (UTR/Transaction code) are required'
      });
    }

    // Locate participant registration
    const registration = await prisma.registration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return res.status(404).json({
        status: 404,
        message: 'Registration not found'
      });
    }

    // Update with reference UTR code
    const updatedRegistration = await prisma.registration.update({
      where: { id: registrationId },
      data: {
        paymentReference,
        paymentStatus: 'PENDING' // Await admin verification
      }
    });

    return res.status(200).json({
      status: 200,
      message: 'UTR payment reference code submitted successfully. Admin will verify it soon.',
      data: {
        id: updatedRegistration.id,
        name: updatedRegistration.name,
        payableAmount: updatedRegistration.payableAmount,
        paymentReference: updatedRegistration.paymentReference,
        paymentStatus: updatedRegistration.paymentStatus
      }
    });
  } catch (error) {
    next(error);
  }
};

// Razorpay functions removed as payment is processed via direct UPI UTR verification

// 6. Fetch Active Payment Configuration
const getPaymentConfig = async (req, res, next) => {
  try {
    let config = await prisma.paymentConfig.findUnique({
      where: { id: 'default' }
    });
    
    if (!config) {
      config = {
        id: 'default',
        upiId: 'agniveshevents@upi',
        qrCodeUrl: '/assets/img/qr-code.png',
        qrCodeBase64: null
      };
    }
    
    return res.status(200).json({
      status: 200,
      data: config
    });
  } catch (error) {
    next(error);
  }
};

// 7. Submit Contact Enquiry Form
const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({
        status: 400,
        message: 'All fields (name, email, phone, message) are required'
      });
    }
    
    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, message }
    });
    
    return res.status(201).json({
      status: 201,
      message: 'Contact enquiry submitted successfully',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// 8. Submit Abstract Presentation Form
const submitAbstract = async (req, res, next) => {
  try {
    const { name, email, phone, designation, institution, presentationType, category, title, abstractText } = req.body;
    
    if (!name || !email || !phone || !designation || !institution || !presentationType || !category || !title || !abstractText) {
      return res.status(400).json({
        status: 400,
        message: 'All fields are required'
      });
    }
    
    // Server-side word count validation
    const wordCount = abstractText.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount > 250) {
      return res.status(400).json({
        status: 400,
        message: 'Abstract text must not exceed 250 words'
      });
    }
    
    const submission = await prisma.abstractSubmission.create({
      data: { name, email, phone, designation, institution, presentationType, category, title, abstractText }
    });
    
    return res.status(201).json({
      status: 201,
      message: 'Abstract submitted successfully',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// 9. Submit Exhibitor Enquiry Form
const submitExhibitor = async (req, res, next) => {
  try {
    const { companyName, contactName, email, phone, category, country, state, city, street, zip, productCategories } = req.body;
    
    if (!companyName || !contactName || !email || !phone || !category || !country || !state || !city || !street || !zip) {
      return res.status(400).json({
        status: 400,
        message: 'All required fields are missing'
      });
    }
    
    // stringify product categories if passed as array
    const categoriesStr = Array.isArray(productCategories) 
      ? productCategories.join(', ') 
      : (productCategories || '');
      
    const submission = await prisma.exhibitorSubmission.create({
      data: {
        companyName,
        contactName,
        email,
        phone,
        category,
        country,
        state,
        city,
        street,
        zip,
        productCategories: categoriesStr
      }
    });
    
    return res.status(201).json({
      status: 201,
      message: 'Exhibitor enquiry submitted successfully',
      data: submission
    });
  } catch (error) {
    next(error);
  }
};

// 10. Fetch Active Exhibitor Logos
const getExhibitorLogos = async (req, res, next) => {
  try {
    const logos = await prisma.exhibitorLogo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    return res.status(200).json({
      status: 200,
      data: logos
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  verifyCoupon,
  registerParticipant,
  submitPaymentUTR,
  getPaymentConfig,
  submitContact,
  submitAbstract,
  submitExhibitor,
  getExhibitorLogos
};
