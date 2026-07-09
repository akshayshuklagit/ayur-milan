require('dotenv').config();
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper to make Prisma engines executable on Linux environments (prevents EACCES errors)
const makeEnginesExecutable = () => {
  try {
    const pathsToSearch = [
      path.join(__dirname, '../node_modules/@prisma/engines'),
      path.join(__dirname, '../node_modules/.prisma/client'),
      path.join(process.cwd(), 'node_modules/@prisma/engines'),
      path.join(process.cwd(), 'node_modules/.prisma/client')
    ];

    pathsToSearch.forEach(dir => {
      if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          // Identify Linux binary files
          if (file.includes('debian') || file.includes('query-engine') || file.includes('schema-engine')) {
            const filePath = path.join(dir, file);
            try {
              const stats = fs.statSync(filePath);
              if (stats.isFile()) {
                fs.chmodSync(filePath, 0o755);
                console.log(`🔓 [Permissions] Set executable permission (755) for: ${file}`);
              }
            } catch (err) {
              console.warn(`⚠️ [Permissions] Failed to chmod ${file}:`, err.message);
            }
          }
        });
      }
    });
  } catch (globalErr) {
    console.warn('⚠️ [Permissions] Error making engines executable:', globalErr.message);
  }
};

// Run permission fixes
makeEnginesExecutable();

const { startServer } = require('./app');

// Initialize and start the Express & AdminJS server immediately
startServer().catch((error) => {
  console.error('💥 Fatal error starting server:', error);
  process.exit(1);
});
