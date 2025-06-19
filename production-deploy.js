#!/usr/bin/env node

// Complete production deployment solution for Replit
import { spawn, execSync } from 'child_process';
import { existsSync, mkdirSync, copyFileSync, rmSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set production environment
process.env.NODE_ENV = 'production';

console.log('🚀 Starting Production Deployment');
console.log('Environment:', process.env.NODE_ENV);

async function deployProduction() {
  try {
    // Step 1: Clean previous build
    console.log('🧹 Cleaning previous build...');
    if (existsSync('dist')) {
      rmSync('dist', { recursive: true, force: true });
    }
    
    // Step 2: Install dependencies
    console.log('📦 Installing dependencies...');
    execSync('npm ci', { stdio: 'inherit' });
    
    // Step 3: Build the application
    console.log('🔨 Building application...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Step 4: Verify build output
    if (!existsSync('dist')) {
      throw new Error('Build failed: dist directory not created');
    }
    
    // Step 5: Create server/public directory and copy built files
    console.log('📂 Setting up static file serving...');
    const serverPublicDir = join(__dirname, 'server', 'public');
    if (!existsSync(serverPublicDir)) {
      mkdirSync(serverPublicDir, { recursive: true });
    }
    
    // Copy dist contents to server/public for static serving
    execSync(`cp -r dist/* server/public/`, { stdio: 'inherit' });
    
    console.log('✅ Production build completed successfully!');
    console.log('🌟 Starting production server...');
    
    // Step 6: Start production server
    const serverProcess = spawn('node', ['dist/index.js'], {
      stdio: 'inherit',
      env: { ...process.env, NODE_ENV: 'production', PORT: process.env.PORT || '5000' }
    });
    
    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('Received SIGTERM, shutting down gracefully...');
      serverProcess.kill('SIGTERM');
    });
    
    process.on('SIGINT', () => {
      console.log('Received SIGINT, shutting down gracefully...');
      serverProcess.kill('SIGINT');
    });
    
    serverProcess.on('close', (code) => {
      console.log(`Server process exited with code ${code}`);
      process.exit(code);
    });
    
    serverProcess.on('error', (err) => {
      console.error('Failed to start server:', err);
      process.exit(1);
    });
    
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployProduction();