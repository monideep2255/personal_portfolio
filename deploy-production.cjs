const { spawn, execSync } = require('child_process');
const { existsSync, mkdirSync, copyFileSync, readdirSync, statSync } = require('fs');
const path = require('path');

// Set production environment
process.env.NODE_ENV = 'production';
process.env.PORT = process.env.PORT || '5000';

console.log('Starting production deployment...');

function copyDirectory(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const items = readdirSync(src);
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Step 1: Build the application
  console.log('Building application...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  // Step 2: Build the server
  console.log('Building server...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  
  // Step 3: Copy built files to server/public for static serving
  console.log('Setting up static files...');
  if (existsSync('dist')) {
    // Copy frontend assets to server/public
    const frontendFiles = readdirSync('dist').filter(file => file !== 'index.js');
    mkdirSync('server/public', { recursive: true });
    
    frontendFiles.forEach(file => {
      const srcPath = path.join('dist', file);
      const destPath = path.join('server/public', file);
      
      if (statSync(srcPath).isDirectory()) {
        copyDirectory(srcPath, destPath);
      } else {
        copyFileSync(srcPath, destPath);
      }
    });
    
    console.log('Static files configured successfully');
  }
  
  // Step 4: Start the production server
  console.log('Starting production server...');
  
  const server = spawn('node', ['dist/index.js'], {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('error', (err) => {
    console.error('Server startup failed:', err.message);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    console.log(`Server exited with code ${code}`);
    process.exit(code);
  });
  
  // Handle shutdown
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM, shutting down...');
    server.kill('SIGTERM');
  });
  
  process.on('SIGINT', () => {
    console.log('Received SIGINT, shutting down...');
    server.kill('SIGINT');
  });
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}