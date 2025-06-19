#!/usr/bin/env node

// Simple production server for Replit deployment
// This bypasses the .replit dev configuration issue

process.env.NODE_ENV = 'production';

console.log('Starting Replit production server...');
console.log('Environment:', process.env.NODE_ENV);

// Import and start the server directly
import('./server/index.ts').then(() => {
  console.log('Production server started successfully');
}).catch((error) => {
  console.error('Server startup failed:', error);
  process.exit(1);
});