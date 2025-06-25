#!/usr/bin/env node

// Clean production deployment for Replit
import { spawn } from 'child_process';
import fs from 'fs';

process.env.NODE_ENV = 'production';

console.log('Starting production deployment...');

async function deploy() {
  // Build if dist doesn't exist
  if (!fs.existsSync('./dist/index.js')) {
    console.log('Building application...');
    const build = spawn('npm', ['run', 'build'], { stdio: 'inherit' });
    
    await new Promise((resolve, reject) => {
      build.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`Build failed with code ${code}`));
      });
    });
  }
  
  console.log('Starting production server...');
  const server = spawn('npm', ['start'], { stdio: 'inherit' });
  
  server.on('close', (code) => {
    process.exit(code);
  });
}

deploy().catch(error => {
  console.error('Deployment failed:', error.message);
  process.exit(1);
});