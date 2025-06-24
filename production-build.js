#!/usr/bin/env node

// Production build and start script
const { execSync } = require('child_process');

console.log('Building for production...');

try {
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Build the application
  console.log('Running build command...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
  console.log('Starting production server...');
  
  // Start production server
  execSync('npm start', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Production build failed:', error.message);
  process.exit(1);
}