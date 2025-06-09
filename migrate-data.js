// Migration script to populate your Neon database with projects
import { Pool } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: DATABASE_URL });

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built with React and Express, featuring project showcase, contact form, and admin dashboard.",
    githubUrl: "https://github.com/monideep2255/personal_portfolio",
    liveUrl: "https://your-portfolio.netlify.app",
    patternSeed: 12345,
    featured: true,
    categories: ["Web Development"],
    tags: ["React", "Express", "PostgreSQL", "Tailwind"],
    status: "published"
  },
  {
    title: "Fin Buddy",
    description: "A comprehensive financial management application to track expenses, manage budgets, and analyze spending patterns.",
    githubUrl: "https://github.com/monideep2255/fin-buddy",
    liveUrl: null,
    patternSeed: 23456,
    featured: true,
    categories: ["Web Development", "FinTech"],
    tags: ["Finance", "Budget", "Analytics"],
    status: "published"
  },
  {
    title: "Insight Lens",
    description: "An AI-powered data analysis tool that provides insights and visualizations for complex datasets.",
    githubUrl: "https://github.com/monideep2255/insight-lens",
    liveUrl: null,
    patternSeed: 34567,
    featured: false,
    categories: ["AI/ML", "Data Analysis"],
    tags: ["AI", "Data Science", "Visualization"],
    status: "published"
  },
  {
    title: "Daily Quote Sender – Charge-Up Edition",
    description: "An automated system that sends daily motivational quotes to boost productivity and morale.",
    githubUrl: "https://github.com/monideep2255/daily-quote-sender",
    liveUrl: null,
    patternSeed: 45678,
    featured: false,
    categories: ["Automation"],
    tags: ["Automation", "Motivation", "Productivity"],
    status: "published"
  }
];

async function migrateProjects() {
  try {
    // Clear existing projects
    await pool.query('DELETE FROM projects');
    
    // Insert projects
    for (const project of projects) {
      await pool.query(
        `INSERT INTO projects (title, description, github_url, live_url, pattern_seed, featured, categories, tags, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          project.title,
          project.description,
          project.githubUrl,
          project.liveUrl,
          project.patternSeed,
          project.featured,
          JSON.stringify(project.categories),
          JSON.stringify(project.tags),
          project.status
        ]
      );
    }
    
    console.log('Projects migrated successfully!');
    const result = await pool.query('SELECT COUNT(*) FROM projects');
    console.log(`Total projects: ${result.rows[0].count}`);
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

migrateProjects();