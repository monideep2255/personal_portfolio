#!/usr/bin/env node

// Direct production server for Replit deployment
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// Set production environment
process.env.NODE_ENV = 'production';

// Import and start the server
async function startServer() {
  try {
    // Use tsx to run TypeScript directly in production
    const tsx = await import('tsx/esm');
    await tsx.register();
    
    // Import the server
    const { default: serverModule } = await import('./server/index.ts');
    
    console.log('Production server started successfully');
  } catch (error) {
    console.error('Server startup failed:', error);
    process.exit(1);
  }
}

startServer();