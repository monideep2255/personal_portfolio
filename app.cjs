// Robust production server for Replit deployment
const { spawn } = require('child_process');
const { existsSync, mkdirSync, writeFileSync } = require('fs');

process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Production server initializing...');

// Create necessary directories
if (!existsSync('server/public')) {
  mkdirSync('server/public', { recursive: true });
  // Create a basic index.html to prevent 404 errors
  writeFileSync('server/public/index.html', `
<!DOCTYPE html>
<html>
<head><title>Production Server</title></head>
<body><h1>Server Running in Production Mode</h1></body>
</html>
  `.trim());
}

// Start server with error handling
function startServer() {
  const server = spawn('npx', ['tsx', 'server/index.ts'], {
    stdio: ['pipe', 'pipe', 'pipe'],
    env: { ...process.env, NODE_ENV: 'production' }
  });

  server.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  server.stderr.on('data', (data) => {
    const error = data.toString();
    if (error.includes('EADDRINUSE')) {
      console.error('Port 5000 is already in use');
      process.exit(1);
    } else if (error.includes('database') || error.includes('connection')) {
      console.error('Database connection issue:', error);
      // Continue running - server might still work for static content
    } else {
      process.stderr.write(data);
    }
  });

  server.on('error', (err) => {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  });

  server.on('exit', (code, signal) => {
    if (code !== 0) {
      console.error(`Server exited with code ${code}, signal ${signal}`);
      process.exit(code);
    }
  });

  // Handle shutdown
  process.on('SIGTERM', () => {
    console.log('Shutting down...');
    server.kill('SIGTERM');
  });

  process.on('SIGINT', () => {
    console.log('Shutting down...');
    server.kill('SIGINT');
  });

  return server;
}

startServer();