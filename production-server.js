#!/usr/bin/env node

// Simple production server that checks environment and builds if needed
import { spawn, execSync } from 'child_process';
import { existsSync } from 'fs';
import { join } from 'path';

const isProductionDeploy = process.env.REPLIT_DEPLOYMENT === 'true' || 
                          process.env.NODE_ENV === 'production';

if (isProductionDeploy) {
  console.log('Production deployment detected');
  
  // Build if dist doesn't exist
  if (!existsSync('dist/index.js')) {
    console.log('Building application...');
    try {
      execSync('npm run build', { stdio: 'inherit' });
    } catch (error) {
      console.error('Build failed');
      process.exit(1);
    }
  }
  
  // Start production server
  console.log('Starting production server...');
  process.env.NODE_ENV = 'production';
  const server = spawn('node', ['dist/index.js'], { stdio: 'inherit' });
  
  server.on('exit', (code) => process.exit(code));
} else {
  // Development mode
  console.log('Starting development server...');
  const server = spawn('tsx', ['server/index.ts'], { stdio: 'inherit' });
  server.on('exit', (code) => process.exit(code));
}