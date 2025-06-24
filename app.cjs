// Simple production entry point for Replit deployment
// This bypasses the .replit dev command restriction

const { spawn } = require('child_process');
const fs = require('fs');

// Force production environment
process.env.NODE_ENV = 'production';

console.log('Starting production deployment...');
console.log('Environment:', process.env.NODE_ENV);

// Check if we need to build
const buildExists = fs.existsSync('./dist/index.js');

if (!buildExists) {
  console.log('Building application...');
  const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
  
  build.on('close', (code) => {
    if (code === 0) {
      console.log('Build complete, starting server...');
      startServer();
    } else {
      console.error('Build failed');
      process.exit(1);
    }
  });
} else {
  console.log('Build exists, starting server...');
  startServer();
}

function startServer() {
  const server = spawn('npm', ['start'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    process.exit(code);
  });
}