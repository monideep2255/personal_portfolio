#!/usr/bin/env node

// Production wrapper script for Replit deployment
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('🚀 Starting production deployment process...');

// Set production environment
process.env.NODE_ENV = 'production';

try {
  // Check if this is a production deployment (not dev mode)
  const isProduction = process.env.NODE_ENV === 'production' || 
                      process.argv.includes('--production') ||
                      !process.env.REPLIT_DEV_DOMAIN;

  if (isProduction) {
    console.log('📦 Building application for production...');
    
    // Run the build process
    execSync('npm run build', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
    
    // Check if build was successful
    if (!existsSync('dist/index.js')) {
      throw new Error('Build failed - dist/index.js not found');
    }
    
    console.log('✅ Build completed successfully');
    console.log('🌟 Starting production server...');
    
    // Start the production server
    execSync('npm start', { 
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production' }
    });
  } else {
    console.log('🔧 Starting development server...');
    // Fall back to development mode
    execSync('npm run dev', { stdio: 'inherit' });
  }
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}