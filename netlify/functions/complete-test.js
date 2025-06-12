import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test 1: Database connection and project count
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const projects = await sql`SELECT id, title, featured, status FROM projects ORDER BY featured DESC, id`;
    
    // Test 2: Contact form test
    const testMessage = await sql`
      INSERT INTO contact_messages (name, email, message) 
      VALUES ('System Test', 'test@netlify.com', 'Deployment verification test')
      RETURNING id, name, email
    `;
    
    // Test 3: Analytics test
    const testAnalytics = await sql`
      INSERT INTO analytics (event_type, path, metadata)
      VALUES ('test', '/deployment-check', '{"source": "netlify-function"}')
      RETURNING id, event_type, path
    `;
    
    // Test 4: Environment variables
    const envTest = {
      database_url: process.env.DATABASE_URL ? 'CONNECTED' : 'MISSING',
      email_user: process.env.EMAIL_USER || 'NOT_SET',
      email_password_length: process.env.EMAIL_PASSWORD?.length || 0,
      admin_username: process.env.ADMIN_USERNAME || 'NOT_SET',
      admin_password_set: process.env.ADMIN_PASSWORD ? 'YES' : 'NO'
    };
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deployment_status: 'FULLY_FUNCTIONAL',
        timestamp: new Date().toISOString(),
        database: {
          connected: true,
          project_count: parseInt(projectCount[0].count),
          projects: projects
        },
        contact_form: {
          working: true,
          test_message_id: testMessage[0].id
        },
        analytics: {
          working: true,
          test_event_id: testAnalytics[0].id
        },
        environment: envTest,
        api_endpoints: {
          projects_api: 'https://monideep-chakraborti.netlify.app/.netlify/functions/api/projects',
          admin_login: 'https://monideep-chakraborti.netlify.app/.netlify/functions/api/admin/login',
          contact_form: 'https://monideep-chakraborti.netlify.app/.netlify/functions/api/contact'
        }
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deployment_status: 'ERROR',
        error: error.message,
        stack: error.stack
      })
    };
  }
};