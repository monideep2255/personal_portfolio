// Alternative entry point for production deployment
// This file ensures production mode regardless of .replit configuration

process.env.NODE_ENV = 'production';

// Start the main application
require('./main.js');