// Alternative production entry point
// Replit deployment workaround

process.env.NODE_ENV = 'production';

const { execSync } = require('child_process');
const fs = require('fs');

try {
  // Ensure build exists
  if (!fs.existsSync('./dist/index.js')) {
    console.log('Building for production...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  
  console.log('Starting production server...');
  execSync('npm start', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Production startup failed:', error.message);
  process.exit(1);
}