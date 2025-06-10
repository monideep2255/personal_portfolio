import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Test basic connection and create tables if needed
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        description TEXT NOT NULL,
        github_url VARCHAR(255) NOT NULL,
        live_url VARCHAR(255),
        featured BOOLEAN DEFAULT false,
        image_url VARCHAR(255),
        pattern_seed INTEGER,
        categories TEXT[] DEFAULT '{}',
        tags TEXT[] DEFAULT '{}',
        status VARCHAR(20) DEFAULT 'published'
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(50) NOT NULL,
        path VARCHAR(255),
        user_agent TEXT,
        ip_address VARCHAR(45),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    // Check project count
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    
    // Insert sample projects if none exist
    if (projectCount[0].count === 0) {
      await sql`
        INSERT INTO projects (title, description, github_url, featured, pattern_seed, categories, tags, status) VALUES
        ('Personal Portfolio Website', 'A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS showcasing my development skills and projects.', 'https://github.com/monideep2255/personal-portfolio', true, 42, ARRAY['Web Development', 'Frontend'], ARRAY['React', 'TypeScript', 'Tailwind CSS', 'Vite'], 'published'),
        ('E-commerce Platform', 'Full-stack e-commerce application with user authentication, product catalog, shopping cart, and secure payment processing.', 'https://github.com/monideep2255/ecommerce-platform', true, 73, ARRAY['Full Stack', 'E-commerce'], ARRAY['React', 'Node.js', 'PostgreSQL', 'Stripe'], 'published'),
        ('Task Management Application', 'Collaborative task management tool with real-time updates, team collaboration features, and project tracking.', 'https://github.com/monideep2255/task-manager', false, 156, ARRAY['Web Development', 'Productivity'], ARRAY['React', 'WebSocket', 'MongoDB', 'Express'], 'published'),
        ('Weather Analytics Dashboard', 'Real-time weather dashboard with historical data analysis, forecasting, and customizable alerts for multiple locations.', 'https://github.com/monideep2255/weather-dashboard', false, 234, ARRAY['Web Development', 'Data Visualization'], ARRAY['JavaScript', 'Chart.js', 'Weather API', 'Bootstrap'], 'published')
      `;
    }
    
    const finalCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const sampleProjects = await sql`SELECT id, title, featured FROM projects LIMIT 3`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        database_connected: true,
        project_count: finalCount[0].count,
        sample_projects: sampleProjects,
        database_url_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0,
        message: 'Database connection successful and tables created'
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
        database_connected: false,
        error: error.message,
        error_code: error.code,
        database_url_length: process.env.DATABASE_URL ? process.env.DATABASE_URL.length : 0
      })
    };
  }
};