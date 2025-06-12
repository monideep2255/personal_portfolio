import { neon } from '@neondatabase/serverless';

export const handler = async (event, context) => {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    // Clear existing projects and reset sequence
    await sql`TRUNCATE TABLE projects RESTART IDENTITY CASCADE`;
    
    // Insert exact Replit project data with correct IDs
    const projects = await sql`
      INSERT INTO projects (
        id,
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
        9,
        'Personal Portfolio',
        'A modern, responsive portfolio website built with React and Express, featuring project showcase, contact form, and admin dashboard.',
        'https://github.com/monideep2255/personal_portfolio',
        'https://your-portfolio.netlify.app',
        true,
        12345,
        ARRAY['Web Development'],
        ARRAY['React', 'Express', 'PostgreSQL', 'Tailwind'],
        'published'
      ),
      (
        10,
        'Fin Buddy',
        'A comprehensive financial management application to track expenses, manage budgets, and analyze spending patterns.',
        'https://github.com/monideep2255/fin-buddy',
        NULL,
        true,
        23456,
        ARRAY['Web Development', 'FinTech'],
        ARRAY['Finance', 'Budget', 'Analytics'],
        'published'
      ),
      (
        11,
        'Insight Lens',
        'An AI-powered data analysis tool that provides insights and visualizations for complex datasets.',
        'https://github.com/monideep2255/insight-lens',
        NULL,
        false,
        34567,
        ARRAY['AI/ML', 'Data Analysis'],
        ARRAY['AI', 'Data Science', 'Visualization'],
        'published'
      ),
      (
        12,
        'Daily Quote Sender – Charge-Up Edition',
        'An automated system that sends daily motivational quotes to boost productivity and morale.',
        'https://github.com/monideep2255/daily-quote-sender',
        NULL,
        false,
        45678,
        ARRAY['Automation'],
        ARRAY['Automation', 'Motivation', 'Productivity'],
        'published'
      )
      RETURNING id, title, featured
    `;
    
    // Reset sequence to continue from 13
    await sql`SELECT setval('projects_id_seq', 12, true)`;
    
    // Verify data matches Replit exactly
    const verification = await sql`SELECT id, title, featured FROM projects ORDER BY id`;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        message: 'Replit data synced to Netlify exactly',
        projects_synced: projects.length,
        verification: verification,
        sequence_reset: 'Next project will have ID 13'
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
        error: error.message
      })
    };
  }
};