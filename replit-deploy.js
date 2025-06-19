#!/usr/bin/env node

import { execSync, spawn } from 'child_process';
import { existsSync } from 'fs';

// Force production environment for deployment
process.env.NODE_ENV = 'production';

console.log('Replit Production Deployment Starting...');

try {
  // Always build for deployment
  console.log('Building application for production...');
  execSync('npm run build', { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });

  // Verify build
  if (!existsSync('dist/index.js')) {
    throw new Error('Production build failed - server bundle not found');
  }

  if (!existsSync('dist/index.html')) {
    throw new Error('Production build failed - client bundle not found');  
  }

  console.log('Build successful - starting production server...');
  
  // Start production server
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: { 
      ...process.env, 
      NODE_ENV: 'production',
      PORT: process.env.PORT || 5000
    }
  });

  // Handle shutdown signals
  ['SIGTERM', 'SIGINT', 'SIGHUP'].forEach(signal => {
    process.on(signal, () => {
      console.log(`Received ${signal}, shutting down gracefully...`);
      server.kill(signal);
    });
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });

  server.on('exit', (code, signal) => {
    console.log(`Server exited with code ${code} and signal ${signal}`);
    process.exit(code || 0);
  });

} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}