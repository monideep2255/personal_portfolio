// Alternative production entry - ESM module to avoid any conflicts
import { execSync, spawn } from 'child_process';
import { existsSync } from 'fs';

process.env.NODE_ENV = 'production';

console.log('Initializing production deployment...');

try {
  // Try to build first
  if (!existsSync('dist/index.js')) {
    console.log('Building application...');
    execSync('npm run build', { stdio: 'inherit' });
  }
  
  // Start the built version if it exists, otherwise start directly
  const startCommand = existsSync('dist/index.js') 
    ? ['node', 'dist/index.js']
    : ['npx', 'tsx', 'server/index.ts'];
    
  console.log('Starting server with:', startCommand.join(' '));
  
  const server = spawn(startCommand[0], startCommand.slice(1), {
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'production' }
  });
  
  server.on('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  });
  
  server.on('close', (code) => {
    process.exit(code);
  });
  
  process.on('SIGTERM', () => server.kill('SIGTERM'));
  process.on('SIGINT', () => server.kill('SIGINT'));
  
} catch (error) {
  console.error('Deployment failed:', error.message);
  process.exit(1);
}