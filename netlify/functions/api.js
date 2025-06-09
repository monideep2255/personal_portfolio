import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { projects, contactMessages, analytics } from '../../shared/schema.js';
import { eq, desc } from 'drizzle-orm';

// Initialize database with HTTP adapter (serverless compatible)
const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema: { projects, contactMessages, analytics } });

export const handler = async (event, context) => {
  const { httpMethod, path, body, headers } = event;
  
  // Handle CORS
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  };

  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    // Debug endpoint
    if (path.includes('/debug')) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          env_check: {
            DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
            EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
            EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
            ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'SET' : 'MISSING',
            ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'MISSING'
          }
        })
      };
    }

    const parsedBody = body ? JSON.parse(body) : {};
    const apiPath = path.replace('/.netlify/functions/api', '') || '/';
    
    // Projects endpoints
    if (apiPath === '/projects' && httpMethod === 'GET') {
      const allProjects = await db.select().from(projects)
        .where(eq(projects.status, 'published'))
        .orderBy(desc(projects.id));
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(allProjects),
      };
    }

    if (apiPath === '/projects/featured' && httpMethod === 'GET') {
      const featuredProjects = await db.select().from(projects)
        .where(eq(projects.featured, true))
        .orderBy(desc(projects.id));
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(featuredProjects),
      };
    }

    // Contact form
    if (apiPath === '/contact' && httpMethod === 'POST') {
      const [message] = await db.insert(contactMessages).values(parsedBody).returning();
      return {
        statusCode: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      };
    }

    // Analytics
    if (apiPath === '/analytics' && httpMethod === 'POST') {
      const [event] = await db.insert(analytics).values(parsedBody).returning();
      return {
        statusCode: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      };
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not found' }),
    };
  } catch (error) {
    console.error('API error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal server error', details: error.message }),
    };
  }
};