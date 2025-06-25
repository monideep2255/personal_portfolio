// Production deployment that works without full build
const { spawn } = require('child_process');
const fs = require('fs');

process.env.NODE_ENV = 'production';

console.log('Starting production deployment...');

// Ensure basic static directory exists
if (!fs.existsSync('./dist/public')) {
  fs.mkdirSync('./dist/public', { recursive: true });
  fs.writeFileSync('./dist/public/index.html', 
    '<!DOCTYPE html><html><head><title>Portfolio</title></head><body><div id="root">Portfolio Loading...</div></body></html>'
  );
}

// Start production server
if (fs.existsSync('./dist/index.js')) {
  console.log('Using built server...');
  const server = spawn('node', ['dist/index.js'], { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production', PORT: process.env.PORT || 5000 }
  });
  
  server.on('close', (code) => {
    process.exit(code);
  });
} else {
  console.log('Using development server in production mode...');
  const server = spawn('tsx', ['server/index.ts'], { 
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production', PORT: process.env.PORT || 5000 }
  });
  
  server.on('close', (code) => {
    process.exit(code);
  });
}