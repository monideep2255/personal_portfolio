// Production server entry point - completely bypasses .replit configuration
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Force production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Production server starting...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);

// Start the TypeScript server directly
const server = spawn('npx', ['tsx', 'server/index.ts'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    NODE_ENV: 'production'
  }
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

server.on('close', (code) => {
  console.log(`Server exited with code ${code}`);
  process.exit(code);
});

// Graceful shutdown
const shutdown = () => {
  console.log('Shutting down...');
  server.kill('SIGTERM');
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGQUIT', shutdown);