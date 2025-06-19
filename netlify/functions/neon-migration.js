import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('Starting Neon database migration...');
    
    // Create tables if they don't exist
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        github_url VARCHAR(255),
        live_url VARCHAR(255),
        pattern_seed INTEGER,
        featured BOOLEAN DEFAULT false,
        categories TEXT[] DEFAULT '{}',
        tags TEXT[] DEFAULT '{}',
        status VARCHAR(20) DEFAULT 'published',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS analytics (
        id SERIAL PRIMARY KEY,
        event_type VARCHAR(100) NOT NULL,
        path VARCHAR(255),
        user_agent TEXT,
        ip_address INET,
        metadata JSONB DEFAULT '{}',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Clear existing projects and reset sequence
    await sql`TRUNCATE TABLE projects RESTART IDENTITY CASCADE`;
    
    // Insert your exact project data from Replit
    const projects = await sql`
      INSERT INTO projects (
        id, title, description, github_url, live_url, featured, pattern_seed,
        categories, tags, status
      ) VALUES
      (9, 'Personal Portfolio',
       'A modern, responsive portfolio website built with React and Express, featuring project showcase, contact form, and admin dashboard.',
       'https://github.com/monideep2255/personal_portfolio',
       'https://monideep-chakraborti.netlify.app',
       true, 12345,
       ARRAY['Web Development'],
       ARRAY['React', 'Express', 'PostgreSQL', 'Tailwind'],
       'published'),
      (10, 'Fin Buddy',
       'A comprehensive financial management application to track expenses, manage budgets, and analyze spending patterns.',
       'https://github.com/monideep2255/fin-buddy',
       'https://fin-buddy-demo.netlify.app',
       true, 23456,
       ARRAY['Web Development', 'FinTech'],
       ARRAY['Finance', 'Budget', 'Analytics'],
       'published'),
      (11, 'Insight Lens',
       'An AI-powered data analysis tool that provides insights and visualizations for complex datasets.',
       'https://github.com/monideep2255/insight-lens',
       'https://insight-lens-demo.netlify.app',
       false, 34567,
       ARRAY['AI/ML', 'Data Analysis'],
       ARRAY['AI', 'Data Science', 'Visualization'],
       'published'),
      (12, 'Daily Quote Sender – Charge-Up Edition',
       'An automated system that sends daily motivational quotes to boost productivity and morale.',
       'https://github.com/monideep2255/daily-quote-sender',
       'https://daily-quote-sender.netlify.app',
       false, 45678,
       ARRAY['Automation'],
       ARRAY['Automation', 'Motivation', 'Productivity'],
       'published')
      RETURNING id, title, live_url
    `;
    
    // Reset sequence to continue from 13
    await sql`SELECT setval('projects_id_seq', 12, true)`;
    
    // Verify migration
    const projectCount = await sql`SELECT COUNT(*) as count FROM projects`;
    const allProjects = await sql`SELECT id, title, live_url, featured FROM projects ORDER BY id`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Neon database migration completed successfully',
        projects_migrated: projects.length,
        total_projects: projectCount[0].count,
        projects: allProjects,
        next_sequence: 13,
        timestamp: new Date().toISOString()
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
        error: error.message,
        details: error.stack
      })
    };
  }
};