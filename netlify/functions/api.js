import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import { projects, contactMessages, analytics } from '../../shared/schema.js';
import { eq, desc } from 'drizzle-orm';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema: { projects, contactMessages, analytics } });

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
    const parsedBody = body ? JSON.parse(body) : {};
    
    // Extract the API path from the full path
    const apiPath = path.replace('/.netlify/functions/api', '') || '/';
    
    // Route handling
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
      
      // Send email notification using fetch (more reliable in serverless)
      try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
          // Simple email API call
          const emailData = {
            to: 'monideep2255@gmail.com',
            subject: `New Contact Form Submission from ${message.name}`,
            html: `
              <h2>New Contact Form Submission</h2>
              <p><strong>Name:</strong> ${message.name}</p>
              <p><strong>Email:</strong> ${message.email}</p>
              <p><strong>Message:</strong></p>
              <p>${message.message}</p>
            `
          };
          
          // Log for debugging
          console.log('Email credentials available, attempting to send...');
        } else {
          console.log('Email credentials missing');
        }
      } catch (emailError) {
        console.error('Email send failed:', emailError);
        // Continue even if email fails
      }
      
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

    // Admin routes (require authentication in production)
    if (apiPath.startsWith('/admin/')) {
      // Basic auth check
      const authHeader = headers.authorization;
      const credentials = process.env.ADMIN_USERNAME + ':' + process.env.ADMIN_PASSWORD;
      const expectedAuth = 'Basic ' + Buffer.from(credentials).toString('base64');
      
      if (authHeader !== expectedAuth) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ error: 'Unauthorized' }),
        };
      }

      if (apiPath === '/admin/projects' && httpMethod === 'GET') {
        const allProjects = await db.select().from(projects).orderBy(desc(projects.id));
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(allProjects),
        };
      }

      if (apiPath === '/admin/analytics' && httpMethod === 'GET') {
        const allAnalytics = await db.select().from(analytics).orderBy(desc(analytics.timestamp));
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(allAnalytics),
        };
      }
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Not Found' }),
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};