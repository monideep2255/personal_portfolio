#!/usr/bin/env node

// Debug script to test database connection and data in production
import { db } from './server/db.js';
import { projects } from './shared/schema.js';

async function debugProduction() {
  console.log('=== Production Database Debug ===');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
  
  try {
    console.log('\n--- Testing database connection ---');
    const projectsList = await db.select().from(projects).limit(5);
    console.log(`Found ${projectsList.length} projects in database`);
    
    if (projectsList.length > 0) {
      console.log('\n--- Sample project data ---');
      console.log(JSON.stringify(projectsList[0], null, 2));
    } else {
      console.log('No projects found in database');
    }
    
  } catch (error) {
    console.error('\n--- Database connection failed ---');
    console.error('Error:', error.message);
    console.error('Stack:', error.stack);
  }
  
  process.exit(0);
}

debugProduction();