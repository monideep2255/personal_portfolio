#!/usr/bin/env node

// Enhanced production startup script with comprehensive fixes
import { spawn } from 'child_process';
import fs from 'fs';

// Set production environment with explicit configurations
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Starting production deployment with fixes...');

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
  console.log('Building application...');
  await runCommand('npm', ['run', 'build']);
  console.log('Build completed successfully');
}

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...');
    const { db } = await import('./server/db.js');
    const { projects } = await import('./shared/schema.js');
    
    const projectsList = await db.select().from(projects).limit(1);
    console.log(`Database connected: ${projectsList.length} projects found`);
    
    if (projectsList.length === 0) {
      console.log('Database is empty, seeding...');
      await runCommand('node', ['seed-production.js']);
    }
    
    return true;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    return false;
  }
}

async function start() {
  console.log('Starting production server...');
  
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_ENV: 'production',
      PORT: process.env.PORT || '5000'
    }
  });
  
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down gracefully...');
    server.kill('SIGTERM');
  });
  
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down gracefully...');
    server.kill('SIGINT');
  });
  
  server.on('close', (code) => {
    console.log(`Production server exited with code ${code}`);
    process.exit(code);
  });
  
  server.on('error', (err) => {
    console.error('Production server error:', err);
    process.exit(1);
  });
}

async function main() {
  try {
    // Check environment variables
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    
    // Build if needed
    const buildExists = await checkBuildExists();
    if (!buildExists) {
      console.log('Build artifacts not found, building...');
      await build();
    } else {
      console.log('Build artifacts found');
    }
    
    // Test database and seed if needed
    const dbConnected = await testDatabaseConnection();
    if (!dbConnected) {
      throw new Error('Database connection failed');
    }
    
    // Start the production server
    await start();
    
  } catch (error) {
    console.error('Production deployment failed:', error.message);
    process.exit(1);
  }
}

main();