const { Prisma } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = require('./db');

// Reusable hook to trigger confirmation email after registration state is changed to PAID or verified
const triggerEmailIfPaid = async (response, request, context) => {
  const { record } = context;
  // If request is a form submit and there are no validation errors
  if (request.method === 'post' && response && response.record && !response.record.errors) {
    const oldStatus = record ? record.params.paymentStatus : null;
    const newStatus = response.record.params.paymentStatus;
    const oldVerified = record ? record.params.verified : null;
    const newVerified = response.record.params.verified;

    const isNewVerified = newVerified === true || newVerified === 'true';
    const isOldVerified = oldVerified === true || oldVerified === 'true';

    // Status changed to PAID or verified changed to true
    const statusChangedToPaid = (newStatus === 'PAID' && oldStatus !== 'PAID');
    const verifiedChangedToTrue = (isNewVerified && !isOldVerified);

    if (statusChangedToPaid || verifiedChangedToTrue) {
      try {
        const registrationId = response.record.params.id;
        console.log(`✉️ Triggering ticket confirmation email for registration ID: ${registrationId} via AdminJS hook.`);
        
        // Fetch fresh copy from database to ensure accuracy
        const dbReg = await prisma.registration.findUnique({
          where: { id: registrationId }
        });
        
        if (dbReg) {
          const emailService = require('../services/emailService');
          emailService.sendRegistrationConfirmedEmail(dbReg).catch(err => {
            console.error('Failed to send verification email from AdminJS hook:', err);
          });
        }
      } catch (err) {
        console.error('Failed to dispatch confirmation email inside AdminJS hook:', err.message);
      }
    }
  }
  return response;
};

async function initAdmin() {
  // Dynamically import ES modules to bypass CommonJS ERR_PACKAGE_PATH_NOT_EXPORTED constraints in Node.js v24+
  const { default: AdminJS, ComponentLoader } = await import('adminjs');
  const { default: AdminJSExpress } = await import('@adminjs/express');
  const prismaAdapter = await import('@adminjs/prisma');

  const Database = prismaAdapter.Database || (prismaAdapter.default && prismaAdapter.default.Database);
  const Resource = prismaAdapter.Resource || (prismaAdapter.default && prismaAdapter.default.Resource);

  if (!Database || !Resource) {
    throw new Error('Failed to resolve Database or Resource from @adminjs/prisma adapter package');
  }

  // Register the Prisma Adapter
  AdminJS.registerAdapter({ Database, Resource });

  // Get Prisma metadata models from public Prisma namespace
  const models = Prisma.dmmf.datamodel.models;
  const registrationModel = models.find(m => m.name === 'Registration');
  const couponModel = models.find(m => m.name === 'Coupon');
  const adminModel = models.find(m => m.name === 'Admin');
  const paymentConfigModel = models.find(m => m.name === 'PaymentConfig');
  const contactSubmissionModel = models.find(m => m.name === 'ContactSubmission');
  const abstractSubmissionModel = models.find(m => m.name === 'AbstractSubmission');
  const exhibitorSubmissionModel = models.find(m => m.name === 'ExhibitorSubmission');
  const exhibitorLogoModel = models.find(m => m.name === 'ExhibitorLogo');

  if (!registrationModel || !couponModel || !adminModel || !paymentConfigModel || !contactSubmissionModel || !abstractSubmissionModel || !exhibitorSubmissionModel || !exhibitorLogoModel) {
    throw new Error('Prisma schema models not found in DMMF. Please run "npx prisma db push" or "npx prisma generate" first.');
  }

  const prismaModule = require('@prisma/client');

  // Pre-instantiate adapters directly to avoid lodash traversing clientModule and throwing proxy errors
  const registrationResource = new Resource({
    model: registrationModel,
    client: prisma,
    clientModule: prismaModule
  });

  const couponResource = new Resource({
    model: couponModel,
    client: prisma,
    clientModule: prismaModule
  });

  const adminResource = new Resource({
    model: adminModel,
    client: prisma,
    clientModule: prismaModule
  });

  const paymentConfigResource = new Resource({
    model: paymentConfigModel,
    client: prisma,
    clientModule: prismaModule
  });

  const contactSubmissionResource = new Resource({
    model: contactSubmissionModel,
    client: prisma,
    clientModule: prismaModule
  });

  const abstractSubmissionResource = new Resource({
    model: abstractSubmissionModel,
    client: prisma,
    clientModule: prismaModule
  });

  const exhibitorSubmissionResource = new Resource({
    model: exhibitorSubmissionModel,
    client: prisma,
    clientModule: prismaModule
  });

  const exhibitorLogoResource = new Resource({
    model: exhibitorLogoModel,
    client: prisma,
    clientModule: prismaModule
  });

  // Initialize ComponentLoader for custom dashboard
  const componentLoader = new ComponentLoader();
  const DASHBOARD_COMPONENT = componentLoader.add('Dashboard', './dashboard');
  const APPROVE_COMPONENT = componentLoader.add('ApproveAction', './approveAction');
  const VERIFIED_LIST_COMPONENT = componentLoader.add('VerifiedList', './verifiedList');

  // Define Dashboard Handler to fetch live statistics
  const dashboardHandler = async (request, response, context) => {
    try {
      const totalRegistrations = await prisma.registration.count();
      const paidRegistrations = await prisma.registration.count({ where: { paymentStatus: 'PAID' } });
      const pendingRegistrations = await prisma.registration.count({ where: { paymentStatus: 'PENDING' } });
      const failedRegistrations = await prisma.registration.count({ where: { paymentStatus: 'FAILED' } });

      // Revenue collections
      const revenueGroup = await prisma.registration.aggregate({
        _sum: { payableAmount: true },
        where: { paymentStatus: 'PAID' }
      });
      const totalRevenue = revenueGroup._sum.payableAmount || 0;

      const pendingRevenueGroup = await prisma.registration.aggregate({
        _sum: { payableAmount: true },
        where: { paymentStatus: 'PENDING' }
      });
      const pendingRevenue = pendingRevenueGroup._sum.payableAmount || 0;

      // Group demographics
      const participantTypes = await prisma.registration.groupBy({
        by: ['participantType'],
        _count: { id: true }
      });

      const accommodations = await prisma.registration.groupBy({
        by: ['accommodationType'],
        _count: { id: true }
      });

      // Get 5 most recent registrations
      const recentRegistrations = await prisma.registration.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });

      // Submission counts
      const totalContacts = await prisma.contactSubmission.count();
      const totalAbstracts = await prisma.abstractSubmission.count();
      const totalExhibitors = await prisma.exhibitorSubmission.count();

      // Get 5 most recent submissions for each
      const recentContacts = await prisma.contactSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      const recentAbstracts = await prisma.abstractSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      const recentExhibitors = await prisma.exhibitorSubmission.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' }
      });

      // Get registrations from the last 7 days for graphing the trend
      const registrationsByDate = await prisma.registration.findMany({
        select: { createdAt: true },
        where: {
          createdAt: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
          }
        }
      });

      const dailyCounts = {};
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        dailyCounts[key] = 0;
      }
      registrationsByDate.forEach(reg => {
        const key = new Date(reg.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        if (dailyCounts[key] !== undefined) {
          dailyCounts[key]++;
        }
      });
      const dailyTrend = Object.keys(dailyCounts).map(date => ({
        date,
        count: dailyCounts[date]
      }));

      return {
        totalRegistrations,
        paidRegistrations,
        pendingRegistrations,
        failedRegistrations,
        totalRevenue,
        pendingRevenue,
        participantTypes,
        accommodations,
        recentRegistrations,
        totalContacts,
        totalAbstracts,
        totalExhibitors,
        recentContacts,
        recentAbstracts,
        recentExhibitors,
        dailyTrend
      };
    } catch (err) {
      console.error('Prisma query error inside dashboard stats handler:', err);
      return { error: err.message };
    }
  };

  const adminJS = new AdminJS({
    resources: [
      {
        resource: registrationResource,
        options: {
          navigation: { name: 'AyurMilan Data', icon: 'Users' },
          listProperties: [
            'name',
            'phone',
            'participantType',
            'paymentStatus',
            'payableAmount',
            'verified',
            'createdAt'
          ],
          properties: {
            id: { isId: true, isReadOnly: true },
            paymentStatus: {
              availableValues: [
                { value: 'PENDING', label: 'Pending Verification' },
                { value: 'PAID', label: 'Paid / Verified' },
                { value: 'FAILED', label: 'Failed / Rejected' }
              ]
            },
            accommodationType: {
              availableValues: [
                { value: 'None', label: 'No Accommodation' },
                { value: 'Triple Sharing', label: 'Triple Sharing (₹1500)' },
                { value: 'Double Sharing', label: 'Double Sharing (₹3000)' },
                { value: 'Single Room', label: 'Single Room (₹4500)' }
              ]
            },
            participantType: {
              availableValues: [
                { value: 'UG Scholars & Interns', label: 'UG Scholars & Interns (₹1599)' },
                { value: 'PG Scholars / Ph.D / Practitioner', label: 'PG Scholars / Ph.D (₹1999)' },
                { value: 'Other Indian Delegates', label: 'Other Indian Delegates (₹2199)' }
              ]
            },
            gender: {
              availableValues: [
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' }
              ]
            },
            verified: {
              label: 'Approval Status',
              components: {
                list: VERIFIED_LIST_COMPONENT
              }
            },
            whatsapp: { label: 'WhatsApp Number' },
            state: { label: 'State' },
            designation: { label: 'Year / Designation' },
            verified: { type: 'boolean' }
          },
          actions: {
            new: {
              isVisible: true,
              after: triggerEmailIfPaid
            },
            edit: {
              isVisible: true,
              after: triggerEmailIfPaid
            },
            delete: { isVisible: true },
            approve: {
              actionType: 'record',
              icon: 'Check',
              showInList: true,
              isVisible: true,
              component: APPROVE_COMPONENT,
              handler: async (request, response, context) => {
                const { record } = context;
                if (request.method.toLowerCase() === 'post') {
                  const regId = record.params.id;
                  
                  const updated = await prisma.registration.update({
                    where: { id: regId },
                    data: {
                      paymentStatus: 'PAID',
                      verified: true
                    }
                  });
                  
                  try {
                    const emailService = require('../services/emailService');
                    await emailService.sendRegistrationConfirmedEmail(updated);
                  } catch (emailError) {
                    console.error('Failed to send confirmation email on action approval:', emailError.message);
                  }
                  
                  return {
                    record: record.toJSON(context.currentAdmin),
                    notice: {
                      message: `Registration for ${updated.name} has been APPROVED and email ticket sent!`,
                      type: 'success',
                    },
                    redirectUrl: '/admin/resources/Registration'
                  };
                }
                return {
                  record: record.toJSON(context.currentAdmin)
                };
              }
            }
          }
        }
      },
      {
        resource: couponResource,
        options: {
          navigation: { name: 'System Settings', icon: 'Settings' },
          properties: {
            id: { isId: true, isReadOnly: true },
            discountType: {
              availableValues: [
                { value: 'PERCENT', label: 'Percentage (%)' },
                { value: 'FIXED', label: 'Fixed Value (₹)' }
              ]
            }
          }
        }
      },
      {
        resource: adminResource,
        options: {
          navigation: { name: 'System Settings', icon: 'Settings' },
          properties: {
            id: { isId: true, isReadOnly: true },
            password: {
              type: 'password',
              isVisible: {
                list: false,
                show: false,
                edit: true,
                filter: false
              }
            }
          },
          actions: {
            new: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload.password = bcrypt.hashSync(request.payload.password, 10);
                }
                return request;
              }
            },
            edit: {
              before: async (request) => {
                if (request.payload.password) {
                  request.payload.password = bcrypt.hashSync(request.payload.password, 10);
                }
                return request;
              }
            }
          }
        }
      },
      {
        resource: paymentConfigResource,
        options: {
          navigation: { name: 'System Settings', icon: 'Settings' },
          properties: {
            id: { isId: true, isReadOnly: true },
            upiId: { label: 'UPI ID (e.g. name@upi)' },
            qrCodeUrl: { label: 'Custom QR Code Image URL (Optional)' },
            qrCodeBase64: { 
              label: 'Custom QR Code Image Base64 String (Optional)',
              type: 'textarea'
            }
          },
          actions: {
            new: { isVisible: false },
            delete: { isVisible: false }
          }
        }
      },
      {
        resource: contactSubmissionResource,
        options: {
          navigation: { name: 'User Submissions', icon: 'Inbox' },
          properties: {
            id: { isId: true, isReadOnly: true },
            message: { type: 'textarea' }
          }
        }
      },
      {
        resource: abstractSubmissionResource,
        options: {
          navigation: { name: 'User Submissions', icon: 'Inbox' },
          properties: {
            id: { isId: true, isReadOnly: true },
            abstractText: { type: 'textarea' },
            presentationType: {
              availableValues: [
                { value: 'Poster', label: 'Poster Presentation' },
                { value: 'Oral', label: 'Oral Presentation' }
              ]
            }
          }
        }
      },
      {
        resource: exhibitorSubmissionResource,
        options: {
          navigation: { name: 'User Submissions', icon: 'Inbox' },
          properties: {
            id: { isId: true, isReadOnly: true },
            productCategories: { type: 'textarea' }
          }
        }
      },
      {
        resource: exhibitorLogoResource,
        options: {
          navigation: { name: 'System Settings', icon: 'Settings' },
          properties: {
            id: { isId: true, isReadOnly: true },
            logoBase64: { label: 'Logo Base64 String (Optional)', type: 'textarea' }
          }
        }
      }
    ],
    componentLoader,
    dashboard: {
      component: DASHBOARD_COMPONENT,
      handler: dashboardHandler
    },
    rootPath: '/admin', // Route url path
    branding: {
      companyName: 'AyurMilan 2026 Summit',
      logo: '/public/logo.png',
      withMadeWithLove: false,
    },
    locale: {
      translations: {
        en: {
          components: {
            Login: {
              welcomeHeader: 'AyurMilan 2026',
              welcomeMessage: 'Welcome to the AyurMilan Administrative Portal',
              loginButton: 'Log In to Portal'
            }
          }
        }
      }
    },
    availableThemes: [
      {
        id: 'ayurmilan-theme',
        name: 'AyurMilan Ayurvedic Theme',
        overrides: {
          colors: {
            primary100: '#1b4d3e', // Forest green
            primary80: '#2a6f58',
            primary60: '#3c9372',
            primary40: '#54b78f',
            primary20: '#cef0e3',
            bg: '#fcfbf7', // Warm off-white
            paper: '#ffffff',
            text: '#222d29',
          },
          font: "'Outfit', 'Inter', sans-serif",
        }
      }
    ],
    defaultTheme: 'ayurmilan-theme',
  });

  // Configure Authentication router
  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (username, password) => {
      try {
        const admin = await prisma.admin.findUnique({
          where: { username }
        });
        if (admin && bcrypt.compareSync(password, admin.password)) {
          return admin;
        }
      } catch (error) {
        console.error('AdminJS Auth Error:', error.message);
      }
      return null;
    },
    cookiePassword: process.env.JWT_SECRET || 'super-secret-cookie-password-ayurmilan-2026',
  }, null, {
    resave: false,
    saveUninitialized: true,
    secret: process.env.JWT_SECRET || 'super-secret-cookie-password-ayurmilan-2026'
  });

  return { adminJS, adminRouter };
}

module.exports = { initAdmin };
