// Quick production deployment - bypasses slow build
const express = require('express');
const { spawn } = require('child_process');

// Force production environment
process.env.NODE_ENV = 'production';

console.log('Quick deployment starting...');

// Check if we have a built server
const fs = require('fs');
if (fs.existsSync('./dist/index.js')) {
  console.log('Starting built production server...');
  const server = spawn('node', ['dist/index.js'], { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('close', (code) => {
    console.log('Server exited with code:', code);
    process.exit(code);
  });
} else {
  console.log('Starting development server in production mode...');
  const server = spawn('tsx', ['server/index.ts'], { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('close', (code) => {
    console.log('Server exited with code:', code);
    process.exit(code);
  });
}