// Primary entry point for Replit deployment
// Configured for production environment

const { execSync } = require('child_process');
const fs = require('fs');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Initializing production deployment...');
console.log('Environment: production');
console.log('Port:', process.env.PORT);

// Check if we need to build
const needsBuild = !fs.existsSync('dist/index.js');

if (needsBuild) {
  console.log('Building application...');
  try {
    // Build the application
    execSync('npm run build', { stdio: 'inherit' });
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error.message);
    // Fallback to direct server start if build fails
    console.log('Falling back to direct server start...');
    require('./run-production.js');
    return;
  }
}

// Start the built server
if (fs.existsSync('dist/index.js')) {
  console.log('Starting built production server...');
  const { spawn } = require('child_process');
  
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('error', (err) => {
    console.error('Built server failed, falling back to direct start:', err.message);
    require('./run-production.js');
  });
  
  server.on('close', (code) => {
    if (code !== 0) {
      console.log('Built server exited, falling back to direct start');
      require('./run-production.js');
    } else {
      process.exit(code);
    }
  });
  
  // Handle shutdown
  process.on('SIGTERM', () => server.kill('SIGTERM'));
  process.on('SIGINT', () => server.kill('SIGINT'));
  
} else {
  console.log('No build output found, starting direct server...');
  require('./run-production.js');
}