// Simple production start script for Replit
// No build process, just runs the server in production mode

process.env.NODE_ENV = 'production';

const { spawn } = require('child_process');

console.log('Starting production server (no build)...');

const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: { ...process.env, NODE_ENV: 'production', PORT: process.env.PORT || '5000' }
});

server.on('error', (err) => {
  console.error('Server startup failed:', err);
  process.exit(1);
});

server.on('close', (code) => {
  process.exit(code);
});

process.on('SIGTERM', () => server.kill('SIGTERM'));
process.on('SIGINT', () => server.kill('SIGINT'));