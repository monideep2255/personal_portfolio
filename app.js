#!/usr/bin/env node

// Production-ready entry point for Replit deployment
process.env.NODE_ENV = 'production';

import('./server/index.js').catch(() => {
  // Fallback to TypeScript version if compiled version doesn't exist
  import('tsx/esm').then(tsx => {
    tsx.register();
    return import('./server/index.ts');
  });
}).catch(error => {
  console.error('Failed to start application:', error);
  process.exit(1);
});