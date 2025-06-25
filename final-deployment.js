#!/usr/bin/env node

// Final deployment script with all fixes applied
import { spawn } from 'child_process';
import fs from 'fs';

process.env.NODE_ENV = 'production';
console.log('Starting final production deployment...');

async function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      ...options
    });
    
    proc.on('close', (code) => {
      if (code === 0) resolve(code);
      else reject(new Error(`${command} failed with code ${code}`));
    });
    
    proc.on('error', (err) => reject(err));
  });
}

async function main() {
  try {
    // Validate environment
    const required = ['DATABASE_URL', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
    const missing = required.filter(key => !process.env[key]);
    if (missing.length > 0) {
      throw new Error(`Missing: ${missing.join(', ')}`);
    }

    // Build application
    console.log('Building application...');
    await runCommand('npm', ['run', 'build']);

    // Test and seed database
    console.log('Setting up database...');
    try {
      const { db } = await import('./server/db.js');
      const { projects } = await import('./shared/schema.js');
      
      const projectsList = await db.select().from(projects).limit(1);
      if (projectsList.length === 0) {
        console.log('Seeding database...');
        await runCommand('node', ['seed-production.js']);
      }
    } catch (dbError) {
      console.log('Database setup warning:', dbError.message);
    }

    // Start production server
    console.log('Starting production server...');
    const server = spawn('node', ['dist/index.js'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production', PORT: process.env.PORT || '5000' }
    });

    ['SIGTERM', 'SIGINT'].forEach(signal => {
      process.on(signal, () => server.kill(signal));
    });

    server.on('close', (code) => process.exit(code));
    server.on('error', (err) => {
      console.error('Server error:', err);
      process.exit(1);
    });

  } catch (error) {
    console.error('Deployment failed:', error.message);
    process.exit(1);
  }
}

main();