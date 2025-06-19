#!/usr/bin/env node

// Replit-compatible entry point that handles both dev and production
import { spawn } from 'child_process';

// Detect deployment environment
const isDeployment = process.env.REPLIT_DEPLOYMENT || 
                    process.env.NODE_ENV === 'production' ||
                    !process.env.REPLIT_DEV_DOMAIN;

if (isDeployment) {
  console.log('Production mode - starting built server');
  process.env.NODE_ENV = 'production';
  
  // Try to start pre-built server, fall back to direct server start
  import('./dist/index.js').catch(() => {
    console.log('Built server not found, starting direct server');
    spawn('tsx', ['server/index.ts'], { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
  });
} else {
  console.log('Development mode');
  spawn('tsx', ['server/index.ts'], { stdio: 'inherit' });
}