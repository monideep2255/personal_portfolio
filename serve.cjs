const { spawn } = require('child_process');

// Force production mode
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || 5000;

console.log('Production server starting...');
console.log('Environment:', process.env.NODE_ENV);

// Start server directly
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: process.env
});

server.on('error', (err) => {
  console.error('Server failed:', err.message);
  process.exit(1);
});

server.on('close', (code) => {
  process.exit(code);
});

process.on('SIGTERM', () => server.kill('SIGTERM'));
process.on('SIGINT', () => server.kill('SIGINT'));