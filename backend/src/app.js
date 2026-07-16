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

  // Temporary Database Migration Debug Endpoint
  app.get('/debug-db', (req, res) => {
    const fs = require('fs');
    const path = require('path');
    
    // Set executable permissions for Linux engine files (fixes EACCES)
    try {
      const pathsToSearch = [
        path.join(__dirname, '../node_modules/@prisma/engines'),
        path.join(__dirname, '../node_modules/.prisma/client'),
        path.join(process.cwd(), 'node_modules/@prisma/engines'),
        path.join(process.cwd(), 'node_modules/.prisma/client')
      ];
      pathsToSearch.forEach(dir => {
        if (fs.existsSync(dir)) {
          fs.readdirSync(dir).forEach(file => {
            if (file.includes('debian') || file.includes('query-engine') || file.includes('schema-engine')) {
              const filePath = path.join(dir, file);
              if (fs.statSync(filePath).isFile()) {
                fs.chmodSync(filePath, 0o755);
                console.log(`🔓 [Debug Endpoint] Set 755 for: ${file}`);
              }
            }
          });
        }
      });
    } catch (e) {
      console.warn('Failed to chmod inside endpoint:', e.message);
    }

    const { exec } = require('child_process');
    console.log('⚡ Running prisma generate via endpoint...');
    const genCmd = `"${process.execPath}" node_modules/prisma/build/index.js generate`;
    exec(genCmd, (genErr, genStdout, genStderr) => {
      if (genErr) {
        return res.status(500).json({
          success: false,
          error: 'Prisma generate failed: ' + genErr.message,
          stdout: genStdout,
          stderr: genStderr
        });
      }
      
      console.log('⚡ Running prisma db push via endpoint...');
      const cmd = `"${process.execPath}" node_modules/prisma/build/index.js db push`;
      exec(cmd, (error, stdout, stderr) => {
        if (!error) {
          console.log('🌱 Running database seeding via endpoint...');
          const seedCmd = `"${process.execPath}" prisma/seed.js`;
          exec(seedCmd, (seedErr, seedStdout, seedStderr) => {
            res.status(200).json({
              success: true,
              message: 'Prisma Client Generated, Database synchronized and seeded completed!',
              generate: { stdout: genStdout, stderr: genStderr },
              migration: { stdout, stderr },
              seeding: { error: seedErr ? seedErr.message : null, stdout: seedStdout, stderr: seedStderr }
            });
          });
        } else {
          res.status(500).json({
            success: false,
            error: error.message,
            stdout,
            stderr
          });
        }
      });
    });
  });

  // Default API Health Check Endpoint
  app.get('/api/health', (req, res) => {
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
