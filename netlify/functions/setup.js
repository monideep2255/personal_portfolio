import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Clear existing projects and insert fresh data
    await sql`TRUNCATE TABLE projects RESTART IDENTITY CASCADE`;
    
    // Insert projects with all required fields
    const projects = await sql`
      INSERT INTO projects (
        title, 
        description, 
        github_url, 
        live_url,
        featured, 
        pattern_seed, 
        categories, 
        tags, 
        status
      ) VALUES
      (
        'Personal Portfolio Website',
        'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. Features include dark mode, responsive design, contact form with email integration, and admin dashboard for content management.',
        'https://github.com/monideep2255/personal-portfolio',
        'https://monideep-chakraborti.netlify.app',
        true,
        42,
        ARRAY['Web Development', 'Frontend'],
        ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Netlify'],
        'published'
      ),
      (
        'E-commerce Platform',
        'Full-stack e-commerce application with user authentication, product catalog, shopping cart functionality, and secure payment processing using modern web technologies.',
        'https://github.com/monideep2255/ecommerce-platform',
        NULL,
        true,
        73,
        ARRAY['Full Stack', 'E-commerce'],
        ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe API'],
        'published'
      ),
      (
        'Task Management Application',
        'Collaborative task management tool with real-time updates, team collaboration features, project tracking, and intuitive user interface for productivity enhancement.',
        'https://github.com/monideep2255/task-manager',
        NULL,
        false,
        156,
        ARRAY['Web Development', 'Productivity'],
        ARRAY['React', 'WebSocket', 'MongoDB', 'Express.js'],
        'published'
      ),
      (
        'Weather Analytics Dashboard',
        'Real-time weather dashboard with historical data analysis, interactive charts, forecasting capabilities, and customizable alerts for multiple geographic locations.',
        'https://github.com/monideep2255/weather-dashboard',
        NULL,
        false,
        234,
        ARRAY['Data Visualization', 'API Integration'],
        ARRAY['JavaScript', 'Chart.js', 'Weather API', 'Bootstrap'],
        'published'
      )
      RETURNING id, title, featured
    `;
    
    // Verify data insertion
    const totalCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const allProjects = await sql`SELECT id, title, description, featured, categories, tags FROM projects ORDER BY featured DESC, id ASC`;
    
    // Test admin credentials
    const adminTest = {
      username_set: process.env.ADMIN_USERNAME ? 'YES' : 'NO',
      password_set: process.env.ADMIN_PASSWORD ? 'YES' : 'NO',
      username_value: process.env.ADMIN_USERNAME || 'NOT_SET',
      database_url_set: process.env.DATABASE_URL ? 'YES' : 'NO'
    };
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Database setup completed successfully',
        projects_inserted: projects.length,
        total_projects: parseInt(totalCount[0].count),
        projects: allProjects,
        admin_check: adminTest,
        setup_timestamp: new Date().toISOString()
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
        error_code: error.code || 'UNKNOWN',
        stack: error.stack
      })
    };
  }
};