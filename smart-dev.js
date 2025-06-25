#!/usr/bin/env node

// Smart script that detects deployment vs development
import { spawn, execSync } from 'child_process';
import { existsSync, readFileSync } from 'fs';

// Check multiple deployment indicators
const deploymentIndicators = [
  process.env.REPLIT_DEPLOYMENT === 'true',
  process.env.NODE_ENV === 'production',
  process.env.REPLIT_CLUSTER === 'gcp',
  !process.env.REPLIT_DEV_DOMAIN,
  process.env.PORT && process.env.PORT !== '5000'
];

const isDeployment = deploymentIndicators.some(indicator => indicator);

console.log('Environment detection:');
console.log('- REPLIT_DEPLOYMENT:', process.env.REPLIT_DEPLOYMENT);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('- REPLIT_CLUSTER:', process.env.REPLIT_CLUSTER);
console.log('- REPLIT_DEV_DOMAIN:', process.env.REPLIT_DEV_DOMAIN);
console.log('- PORT:', process.env.PORT);
console.log('- Is deployment:', isDeployment);

if (isDeployment) {
  console.log('Production deployment mode activated');
  
  // Set production environment
  process.env.NODE_ENV = 'production';
  
  // Build if needed
  if (!existsSync('dist/index.js')) {
    console.log('Building application...');
    try {
      execSync('npm run build', { 
        stdio: 'inherit',
        env: { ...process.env, NODE_ENV: 'production' }
      });
    } catch (error) {
      console.error('Build failed:', error.message);
      process.exit(1);
    }
  }
  
  console.log('Starting production server...');
  spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
} else {
  console.log('Development mode - starting dev server...');
  spawn('tsx', ['server/index.ts'], { stdio: 'inherit' });
}