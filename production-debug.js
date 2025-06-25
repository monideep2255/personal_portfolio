#!/usr/bin/env node

// Production debugging script to identify deployment issues
import { spawn } from 'child_process';
import fs from 'fs';

// Set production environment
process.env.NODE_ENV = 'production';

console.log('=== Production Environment Debug ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('ADMIN_USERNAME exists:', !!process.env.ADMIN_USERNAME);
console.log('ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);
console.log('SESSION_SECRET exists:', !!process.env.SESSION_SECRET);

async function testDatabaseConnection() {
  try {
    console.log('\n--- Testing Database Connection ---');
    const { db } = await import('./server/db.js');
    const { projects } = await import('./shared/schema.js');
    
    const projectsList = await db.select().from(projects).limit(5);
    console.log(`✅ Database connected: Found ${projectsList.length} projects`);
    
    if (projectsList.length > 0) {
      console.log('Sample project:', projectsList[0].title);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
}

async function testAPIEndpoints() {
  console.log('\n--- Testing API Endpoints ---');
  
  // Start server in background for testing
  return new Promise((resolve) => {
    const server = spawn('npm', ['start'], {
      env: { ...process.env, NODE_ENV: 'production', PORT: '5001' },
      stdio: 'pipe'
    });
    
    // Wait for server to start then test endpoints
    setTimeout(async () => {
      try {
        // Test projects endpoint
        const response = await fetch('http://localhost:5001/api/projects');
        const projects = await response.json();
        
        if (response.ok && Array.isArray(projects)) {
          console.log(`✅ Projects API working: ${projects.length} projects`);
        } else {
          console.log('❌ Projects API failed:', response.status);
        }
        
        // Test auth status
        const authResponse = await fetch('http://localhost:5001/api/auth/status');
        const authStatus = await authResponse.json();
        
        if (authResponse.ok) {
          console.log(`✅ Auth API working: ${JSON.stringify(authStatus)}`);
        } else {
          console.log('❌ Auth API failed:', authResponse.status);
        }
        
      } catch (error) {
        console.log('❌ API test failed:', error.message);
      }
      
      server.kill();
      resolve();
    }, 3000);
  });
}

async function main() {
  const dbConnected = await testDatabaseConnection();
  
  if (dbConnected) {
    await testAPIEndpoints();
  }
  
  console.log('\n=== Debug Complete ===');
  process.exit(0);
}

main().catch(error => {
  console.error('Debug failed:', error);
  process.exit(1);
});