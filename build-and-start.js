// Complete build and production start script
// No references to 'dev' anywhere

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';

console.log('Building application for production...');

try {
  // Build frontend and backend
  execSync('npx vite build', { stdio: 'inherit' });
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  console.log('Build completed successfully');
  
  // Verify build output exists
  if (!fs.existsSync('dist/index.js')) {
    throw new Error('Build output not found');
  }
  
  console.log('Starting production server...');
  
  // Start production server
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    process.exit(code);
  });
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => server.kill('SIGTERM'));
  process.on('SIGINT', () => server.kill('SIGINT'));
  
} catch (error) {
  console.error('Build or start failed:', error.message);
  process.exit(1);
}