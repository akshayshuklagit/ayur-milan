require('dotenv').config();
const { startServer } = require('./app');

// Initialize and start the Express & AdminJS server asynchronously
startServer().catch((error) => {
  console.error('💥 Fatal error starting server:', error);
  process.exit(1);
});
