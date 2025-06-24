#!/usr/bin/env node

// Production start script that bypasses .replit development configuration
process.env.NODE_ENV = 'production';

console.log('Starting production server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 5000);

// Import the compiled server
import('./dist/index.js').then(() => {
  console.log('Production server started successfully');
}).catch((error) => {
  console.error('Production server failed to start:', error);
  process.exit(1);
});