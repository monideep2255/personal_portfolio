#!/usr/bin/env node

// Main entry point that works with Replit's deployment system
import { spawn } from 'child_process';

// Check if we're in a Replit deployment environment
const isReplitDeployment = process.env.REPLIT_DEPLOYMENT === 'true' || 
                          process.env.NODE_ENV === 'production' ||
                          process.argv.includes('--production');

if (isReplitDeployment) {
  // Production mode: start server directly with production environment
  console.log('Starting in production mode');
  process.env.NODE_ENV = 'production';
  
  const server = spawn('tsx', ['server/index.ts'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('exit', (code) => process.exit(code));
} else {
  // Development mode
  console.log('Starting in development mode');
  const server = spawn('tsx', ['server/index.ts'], { stdio: 'inherit' });
  server.on('exit', (code) => process.exit(code));
}