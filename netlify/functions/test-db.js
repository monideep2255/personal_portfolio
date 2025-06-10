import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic connection
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        connection: 'SUCCESS',
        database_url_length: process.env.DATABASE_URL?.length || 0,
        tables: tables.map(t => t.table_name),
        project_count: projectCount[0]?.count || 0,
        raw_error: null
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
        connection: 'FAILED',
        database_url_length: process.env.DATABASE_URL?.length || 0,
        error_message: error.message,
        error_code: error.code,
        raw_error: error.toString()
      })
    };
  }
};