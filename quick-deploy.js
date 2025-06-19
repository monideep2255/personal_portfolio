#!/usr/bin/env node

// Quick deployment test script
process.env.NODE_ENV = 'production';

console.log('Testing production deployment configuration...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT || '5000');

// Test that the server can start in production mode
import('./server/index.ts').then(() => {
  console.log('✅ Production server configuration is valid');
}).catch((error) => {
  console.error('❌ Production server error:', error.message);
  process.exit(1);
});