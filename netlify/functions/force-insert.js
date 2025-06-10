import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // First, delete any existing projects to avoid duplicates
    await sql`DELETE FROM projects`;
    
    // Insert projects with explicit data
    const insertResult = await sql`
      INSERT INTO projects (title, description, github_url, featured, pattern_seed, categories, tags, status) VALUES
      ('Personal Portfolio Website', 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS showcasing development skills and projects.', 'https://github.com/monideep2255/personal-portfolio', true, 42, ARRAY['Web Development', 'Frontend'], ARRAY['React', 'TypeScript', 'Tailwind CSS'], 'published'),
      ('E-commerce Platform', 'Full-stack e-commerce application with user authentication, product catalog, shopping cart, and secure payment processing.', 'https://github.com/monideep2255/ecommerce-platform', true, 73, ARRAY['Full Stack', 'E-commerce'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'published'),
      ('Task Management App', 'Collaborative task management tool with real-time updates, team collaboration features, and project tracking capabilities.', 'https://github.com/monideep2255/task-manager', false, 156, ARRAY['Web Development', 'Productivity'], ARRAY['React', 'WebSocket', 'MongoDB'], 'published'),
      ('Weather Dashboard', 'Real-time weather dashboard with historical data analysis, forecasting, and customizable alerts for multiple locations.', 'https://github.com/monideep2255/weather-dashboard', false, 234, ARRAY['Data Visualization', 'API Integration'], ARRAY['JavaScript', 'Chart.js', 'Weather API'], 'published')
      RETURNING id, title
    `;
    
    // Verify insertion
    const finalCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const allProjects = await sql`SELECT id, title, featured, status FROM projects ORDER BY id`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Projects inserted successfully',
        inserted_count: insertResult.length,
        total_count: parseInt(finalCount[0].count),
        projects: allProjects,
        insert_result: insertResult
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
        success: false,
        error: error.message,
        error_details: error.toString()
      })
    };
  }
};