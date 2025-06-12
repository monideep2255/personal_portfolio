import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  // Handle CORS for browser requests
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: '',
    };
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const projects = await sql`SELECT * FROM projects ORDER BY featured DESC, id ASC`;
    
    return {
      statusCode: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'SUCCESS',
        message: 'Direct API test - projects retrieved successfully',
        project_count: projects.length,
        projects: projects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          githubUrl: p.github_url,
          liveUrl: p.live_url,
          featured: p.featured,
          patternSeed: p.pattern_seed,
          categories: p.categories,
          tags: p.tags,
          status: p.status
        })),
        api_endpoint: '/.netlify/functions/api-test',
        timestamp: new Date().toISOString()
      })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'ERROR',
        error: error.message,
        details: error.toString()
      })
    };
  }
};