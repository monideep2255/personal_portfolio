import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Create tables if they don't exist
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
    
    // Check if projects exist
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    
    // Insert sample projects if none exist
    if (projectCount[0].count === 0) {
      await sql`
        INSERT INTO projects (title, description, github_url, live_url, featured, pattern_seed, categories, tags, status) VALUES
        ('Personal Portfolio', 'A modern, responsive portfolio website built with React and TypeScript', 'https://github.com/monideep2255/portfolio', 'https://monideep-chakraborti.netlify.app', true, 42, ARRAY['Web Development', 'Frontend'], ARRAY['React', 'TypeScript', 'Tailwind'], 'published'),
        ('E-commerce Platform', 'Full-stack e-commerce solution with modern UI and secure payments', 'https://github.com/monideep2255/ecommerce', null, true, 73, ARRAY['Full Stack', 'E-commerce'], ARRAY['React', 'Node.js', 'PostgreSQL'], 'published'),
        ('Task Management App', 'Collaborative task management tool with real-time updates', 'https://github.com/monideep2255/taskapp', null, false, 156, ARRAY['Web Development', 'Productivity'], ARRAY['React', 'WebSocket', 'MongoDB'], 'published'),
        ('Weather Dashboard', 'Real-time weather dashboard with forecasting and alerts', 'https://github.com/monideep2255/weather', null, false, 234, ARRAY['Web Development', 'API Integration'], ARRAY['JavaScript', 'API', 'Charts'], 'published')
      `;
    }
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Database migration completed',
        project_count: projectCount[0].count
      })
    };
    
  } catch (error) {
    console.error('Migration error:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};