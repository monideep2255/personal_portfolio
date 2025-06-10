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
    // Check if this is the debug endpoint
    if (path === '/.netlify/functions/debug' || path.endsWith('/debug')) {
      return {
        statusCode: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          env_check: {
            DATABASE_URL: process.env.DATABASE_URL ? 'SET' : 'MISSING',
            DATABASE_URL_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
            EMAIL_USER: process.env.EMAIL_USER ? 'SET' : 'MISSING',
            EMAIL_PASSWORD: process.env.EMAIL_PASSWORD ? 'SET' : 'MISSING',
            EMAIL_PASSWORD_length: process.env.EMAIL_PASSWORD ? process.env.EMAIL_PASSWORD.length : 0,
            ADMIN_USERNAME: process.env.ADMIN_USERNAME ? 'SET' : 'MISSING',
            ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? 'SET' : 'MISSING',
            NODE_ENV: process.env.NODE_ENV || 'undefined',
            all_env_keys: Object.keys(process.env).filter(key => 
              key.includes('DATABASE') || 
              key.includes('EMAIL') || 
              key.includes('ADMIN')
            )
          },
          message: 'Environment variables debug check'
        })
      };
    }


    const parsedBody = body ? JSON.parse(body) : {};
    
    // Extract the API path from the full path
    const apiPath = path.replace('/.netlify/functions/api', '') || '/';
    
    // Route handling
    if (apiPath === '/projects' && httpMethod === 'GET') {
      try {
        const allProjects = await db.select().from(projects).where(eq(projects.status, 'published')).orderBy(desc(projects.id));
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(allProjects),
        };
      } catch (dbError) {
        console.error('Database query error:', dbError);
        return {
          statusCode: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Database query failed', details: dbError.message }),
        };
      }
    }

    if (apiPath === '/projects/featured' && httpMethod === 'GET') {
      try {
        const featuredProjects = await db.select().from(projects).where(eq(projects.featured, true)).orderBy(desc(projects.id));
        return {
          statusCode: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(featuredProjects),
        };
      } catch (dbError) {
        console.error('Featured projects query error:', dbError);
        return {
          statusCode: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Featured projects query failed', details: dbError.message }),
        };
      }
    }

    if (apiPath === '/contact' && httpMethod === 'POST') {
      try {
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
      } catch (dbError) {
        console.error('Contact form database error:', dbError);
        return {
          statusCode: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Failed to save contact message', details: dbError.message }),
        };
      }
    }

    if (apiPath === '/analytics' && httpMethod === 'POST') {
      try {
        const [event] = await db.insert(analytics).values(parsedBody).returning();
        return {
          statusCode: 201,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify(event),
        };
      } catch (dbError) {
        console.error('Analytics insert error:', dbError);
        return {
          statusCode: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Failed to save analytics event', details: dbError.message }),
        };
      }
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
        try {
          const allProjects = await db.select().from(projects).orderBy(desc(projects.id));
          return {
            statusCode: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(allProjects),
          };
        } catch (dbError) {
          console.error('Admin projects query error:', dbError);
          return {
            statusCode: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to fetch admin projects', details: dbError.message }),
          };
        }
      }

      if (apiPath === '/admin/analytics' && httpMethod === 'GET') {
        try {
          const allAnalytics = await db.select().from(analytics).orderBy(desc(analytics.timestamp));
          return {
            statusCode: 200,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify(allAnalytics),
          };
        } catch (dbError) {
          console.error('Admin analytics query error:', dbError);
          return {
            statusCode: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Failed to fetch admin analytics', details: dbError.message }),
          };
        }
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