#!/usr/bin/env node

// Production startup script for Replit deployment
// This script ensures proper production build and startup

import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

// Set production environment
process.env.NODE_ENV = 'production';

console.log('🚀 Starting production deployment...');

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      ...options
    });
    
    proc.on('close', (code) => {
      if (code === 0) {
        resolve(code);
      } else {
        reject(new Error(`${command} ${args.join(' ')} failed with code ${code}`));
      }
    });
    
    proc.on('error', (err) => {
      reject(err);
    });
  });
}

async function checkBuildExists() {
  const distExists = fs.existsSync('./dist');
  const indexExists = fs.existsSync('./dist/index.js');
  const publicExists = fs.existsSync('./dist/public');
  
  return distExists && indexExists && publicExists;
}

async function build() {
  console.log('📦 Building application...');
  
  // Run the build command
  await runCommand('npm', ['run', 'build']);
  
  console.log('✅ Build completed successfully');
}

async function start() {
  console.log('🌟 Starting production server...');
  
  // Start the production server
  const server = spawn('npm', ['start'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: process.env.PORT || '5000'
    }
  });
  
  // Handle graceful shutdown
  process.on('SIGTERM', () => {
    console.log('📡 Received SIGTERM, shutting down gracefully...');
    server.kill('SIGTERM');
  });
  
  process.on('SIGINT', () => {
    console.log('📡 Received SIGINT, shutting down gracefully...');
    server.kill('SIGINT');
  });
  
  server.on('close', (code) => {
    console.log(`🔚 Production server exited with code ${code}`);
    process.exit(code);
  });
  
  server.on('error', (err) => {
    console.error('❌ Production server error:', err);
    process.exit(1);
  });
}

async function seedDatabase() {
  console.log('🌱 Checking database seed status...');
  try {
    await runCommand('node', ['seed-production.js']);
    console.log('✅ Database seeding completed');
  } catch (error) {
    console.log('⚠️  Database seeding failed (may already be seeded):', error.message);
    // Continue anyway - seeding failure shouldn't stop deployment
  }
}

async function main() {
  try {
    // Check if we need to build
    const buildExists = await checkBuildExists();
    
    if (!buildExists) {
      console.log('🔍 Build artifacts not found, building...');
      await build();
    } else {
      console.log('✅ Build artifacts found, skipping build');
    }
    
    // Seed database if needed
    await seedDatabase();
    
    // Start the production server
    await start();
    
  } catch (error) {
    console.error('❌ Production deployment failed:', error.message);
    process.exit(1);
  }
}

main();