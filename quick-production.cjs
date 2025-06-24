// Quick production deployment for Replit
// This bypasses all .replit file limitations

const { execSync } = require('child_process');
const fs = require('fs');

process.env.NODE_ENV = 'production';

console.log('Quick production deployment starting...');

try {
  // Build if needed
  if (!fs.existsSync('./dist/index.js')) {
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit', timeout: 300000 });
  }
  
  console.log('Starting production server...');
  execSync('npm start', { stdio: 'inherit' });
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  
  // Fallback: try direct server start without build
  console.log('Attempting direct server start...');
  try {
    execSync('NODE_ENV=production tsx server/index.ts', { stdio: 'inherit' });
  } catch (fallbackError) {
    console.error('Fallback also failed:', fallbackError.message);
    process.exit(1);
  }
}