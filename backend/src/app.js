const express = require('express');
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const { routeNotFound, errorHandler } = require('./middlewares/errorMiddleware');

const registrationRoutes = require('./routes/registrationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

async function startServer() {
  const PORT = process.env.PORT || 5000;

  // Load AdminJS dynamically (ESM wrapper)
  const { initAdmin } = require('./config/adminjs');
  const { adminJS, adminRouter } = await initAdmin();

  // Mount AdminJS dashboard (must be placed before body parsers)
  app.use(adminJS.options.rootPath, adminRouter);

  // Serve static public assets (for logo, etc)
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // Security HTTP Headers (Disable CSP so AdminJS styles render)
  // app.use(helmet({
  //   contentSecurityPolicy: false
  // }));

  // Enable CORS (Cross-Origin Resource Sharing)
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

  // Body Parsers for JSON and URL-encoded requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Default API Health Check Endpoint
  app.get('/', (req, res) => {
    res.status(200).json({
      status: 200,
      message: 'AyurMilan 2026 Summit API Server is running smoothly'
    });
  });

  // API Routes mounting
  app.use('/api/registrations', registrationRoutes);
  app.use('/api/admin', adminRoutes);

  // Fallback middlewares for error handling
  app.use(routeNotFound);
  app.use(errorHandler);

  const server = app.listen(PORT, () => {
    console.log(`==================================================`);
    console.log(`🚀 AyurMilan 2026 API Server started successfully!`);
    console.log(`📡 Port: ${PORT}`);
    console.log(`🔧 Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`==================================================`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err, promise) => {
    console.error(`💥 Unhandled Promise Rejection: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
  });
}

module.exports = { startServer };
