#!/usr/bin/env node

// Standalone build script for production deployment
// This ensures the application is properly built for production

import { spawn } from 'child_process';
import fs from 'fs';

// Set production environment
process.env.NODE_ENV = 'production';

console.log('🔨 Building application for production...');

async function runBuild() {
  return new Promise((resolve, reject) => {
    const build = spawn('npm', ['run', 'build'], {
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_ENV: 'production'
      }
    });
    
    build.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Build completed successfully');
        resolve(code);
      } else {
        console.error(`❌ Build failed with code ${code}`);
        reject(new Error(`Build failed with code ${code}`));
      }
    });
    
    build.on('error', (err) => {
      console.error('❌ Build error:', err);
      reject(err);
    });
  });
}

async function verifyBuild() {
  const distExists = fs.existsSync('./dist');
  const indexExists = fs.existsSync('./dist/index.js');
  const publicExists = fs.existsSync('./dist/public');
  
  if (!distExists || !indexExists || !publicExists) {
    throw new Error('Build verification failed - missing required files');
  }
  
  console.log('✅ Build verification passed');
}

async function main() {
  try {
    await runBuild();
    await verifyBuild();
    console.log('🎉 Production build ready for deployment');
  } catch (error) {
    console.error('❌ Build process failed:', error.message);
    process.exit(1);
  }
}

main();