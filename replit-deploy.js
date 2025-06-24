#!/usr/bin/env node

// Replit deployment bypass script
// This works around the .replit file limitation by detecting the environment

import { spawn } from 'child_process';
import fs from 'fs';

// Detect if we're in a deployment environment
const isDeployment = process.env.NODE_ENV === 'production' || 
                    process.env.REPLIT_DEPLOYMENT === 'true' ||
                    process.argv.includes('--production');

console.log('Environment detection:');
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- Is deployment:', isDeployment);

if (isDeployment) {
  console.log('Running in production mode...');
  
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Check if build exists
  const buildExists = fs.existsSync('./dist/index.js');
  
  if (!buildExists) {
    console.log('Build not found, building application...');
    const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('Build successful, starting production server...');
        const server = spawn('npm', ['start'], { stdio: 'inherit' });
        
        server.on('close', (serverCode) => {
          process.exit(serverCode);
        });
      } else {
        console.error('Build failed with code:', code);
        process.exit(1);
      }
    });
  } else {
    console.log('Build exists, starting production server...');
    const server = spawn('npm', ['start'], { stdio: 'inherit' });
    
    server.on('close', (code) => {
      process.exit(code);
    });
  }
} else {
  console.log('Running in development mode...');
  const dev = spawn('npm', ['run', 'dev'], { stdio: 'inherit' });
  
  dev.on('close', (code) => {
    process.exit(code);
  });
}