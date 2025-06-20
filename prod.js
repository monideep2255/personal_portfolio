// Simple, reliable production server for Replit deployment
// This completely avoids the .replit "dev" command issue

const { spawn } = require('child_process');

// Force production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Production server starting...');

// Start server with tsx directly - no build required
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env
});

server.on('error', (err) => {
  console.error('Failed to start:', err.message);
  process.exit(1);
});

server.on('close', (code) => {
  process.exit(code);
});

// Clean shutdown
process.on('SIGTERM', () => server.kill('SIGTERM'));
process.on('SIGINT', () => server.kill('SIGINT'));