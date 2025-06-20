// Final production server for Replit deployment
const { spawn } = require('child_process');
const { existsSync, mkdirSync } = require('fs');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Initializing production server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

// Ensure server/public directory exists to prevent static file errors
if (!existsSync('server/public')) {
  mkdirSync('server/public', { recursive: true });
  console.log('Created server/public directory');
}

// Start the server
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
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

// Handle graceful shutdown
const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully...`);
  server.kill('SIGTERM');
  setTimeout(() => {
    server.kill('SIGKILL');
  }, 5000);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGQUIT', () => shutdown('SIGQUIT'));

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  shutdown('UNCAUGHT_EXCEPTION');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
  shutdown('UNHANDLED_REJECTION');
});