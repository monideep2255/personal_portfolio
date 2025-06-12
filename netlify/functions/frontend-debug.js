export const handler = async (event, context) => {
  const { httpMethod, path, headers } = event;
  
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      environment_check: {
        is_production: process.env.NODE_ENV === 'production',
        netlify_context: process.env.CONTEXT || 'unknown',
        site_url: process.env.URL || 'not_set'
      },
      api_paths_test: {
        current_path: path,
        method: httpMethod,
        expected_api_base: '/.netlify/functions/api',
        projects_endpoint: '/.netlify/functions/api/projects',
        contact_endpoint: '/.netlify/functions/api/contact'
      },
      cors_headers: {
        origin: headers.origin || 'no_origin',
        referer: headers.referer || 'no_referer',
        user_agent: headers['user-agent'] || 'no_user_agent'
      },
      frontend_should_use: {
        api_base_url: '/.netlify/functions/api',
        projects_query: 'queryKey: ["/api/projects"] -> converts to /.netlify/functions/api/projects'
      }
    })
  };
};