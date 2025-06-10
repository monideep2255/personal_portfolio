import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { projects, contactMessages, analytics } from '../../shared/schema.js';
import { eq, desc } from 'drizzle-orm';

const sql = neon(process.env.DATABASE_URL);
const db = drizzle(sql, { schema: { projects, contactMessages, analytics } });

export const handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
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
    const apiPath = path.replace('/.netlify/functions/api', '') || '/';
    const parsedBody = body ? JSON.parse(body) : {};
    
    if (apiPath === '/debug') {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          env_check: {
            DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
            DATABASE_URL_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
            EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
            EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
            ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'SET' : 'MISSING',
            ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'MISSING'
          },
          message: 'Environment debug check'
        })
      };
    }

    if (apiPath === '/projects' && httpMethod === 'GET') {
      const allProjects = await db.select().from(projects).where(eq(projects.status, 'published')).orderBy(desc(projects.id));
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(allProjects),
      };
    }

    if (apiPath === '/projects/featured' && httpMethod === 'GET') {
      const featuredProjects = await db.select().from(projects).where(eq(projects.featured, true)).orderBy(desc(projects.id));
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(featuredProjects),
      };
    }

    if (apiPath === '/contact' && httpMethod === 'POST') {
      const [message] = await db.insert(contactMessages).values(parsedBody).returning();
      return {
        statusCode: 201,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify(message),
      };
    }

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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Route not found', path: apiPath, method: httpMethod }),
    };

  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        error: 'Internal server error', 
        details: error.message,
        path: path,
        method: httpMethod
      }),
    };
  }
};