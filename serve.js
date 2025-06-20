import { spawn } from 'child_process';
import { existsSync } from 'fs';

// Force production mode
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 5000;

console.log('Production server initializing...');

// Direct server start without any build dependencies
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env,
  detached: false
});

server.on('error', (err) => {
  console.error('Server startup failed:', err.message);
  process.exit(1);
});

server.on('close', (code) => {
  if (code !== 0) {
    console.error(`Server exited with code ${code}`);
  }
  process.exit(code);
});

// Handle shutdown signals
process.on('SIGTERM', () => {
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  server.kill('SIGINT');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  server.kill('SIGTERM');
  process.exit(1);
});