#!/usr/bin/env node

// Production startup script that bypasses the .replit dev configuration
process.env.NODE_ENV = 'production';

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🚀 Starting production deployment...');
console.log('📦 Building application...');

// Build the application
const buildProcess = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  cwd: __dirname
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error('❌ Build failed with code:', code);
    process.exit(1);
  }
  
  console.log('✅ Build completed successfully!');
  console.log('🌟 Starting production server...');
  
  // Start the production server
  const startProcess = spawn('npm', ['start'], {
    stdio: 'inherit',
    cwd: __dirname,
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  startProcess.on('close', (startCode) => {
    process.exit(startCode);
  });
});

buildProcess.on('error', (err) => {
  console.error('❌ Failed to start build process:', err);
  process.exit(1);
});