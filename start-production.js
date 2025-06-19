#!/usr/bin/env node

// Production startup script
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting production deployment...');

// Set production environment
process.env.NODE_ENV = 'production';

// Build the application
console.log('📦 Building application...');
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  cwd: __dirname
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed with code:', code);
    process.exit(1);
  }
  
  console.log('✅ Build completed successfully');
  console.log('🌟 Starting production server...');
  
  // Start the production server
  const startProcess = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: process.env.PORT || '5000'
    }
  });
  
  startProcess.on('close', (code) => {
    console.log('Server process exited with code:', code);
  });
});

buildProcess.on('error', (err) => {
  console.error('❌ Build process error:', err);
  process.exit(1);
});