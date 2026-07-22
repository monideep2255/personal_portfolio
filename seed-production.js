#!/usr/bin/env node

// Script to seed production database with projects if empty
import { db } from './server/db.js';
import { projects } from './shared/schema.js';

const actualProjects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built with React and Express, featuring project showcase, contact form, and admin dashboard.",
    githubUrl: "https://github.com/monideep2255/personal_portfolio",
    liveUrl: "https://monideep-portfolio.netlify.app",
    featured: true,
    patternSeed: 12345,
    categories: ["Web Development"],
    tags: ["React", "Express", "PostgreSQL", "Tailwind"],
    status: "published"
  },
  {
    title: "Fin Buddy",
    description: "A comprehensive financial management application to track expenses, manage budgets, and analyze spending patterns.",
    githubUrl: "https://github.com/monideep2255/fin-buddy",
    liveUrl: "https://finbuddy-web.onrender.com",
    featured: true,
    patternSeed: 23456,
    categories: ["Web Development", "FinTech"],
    tags: ["Finance", "Budget", "Analytics"],
    status: "published"
  },
  {
    title: "Insight Lens",
    description: "An AI-powered data analysis tool that provides insights and visualizations for complex datasets.",
    githubUrl: "https://github.com/monideep2255/insight-lens",
    liveUrl: "https://insight-lens-monideepchakrab.replit.app",
    featured: false,
    patternSeed: 34567,
    categories: ["AI/ML", "Data Analysis"],
    tags: ["AI", "Data Science", "Visualization"],
    status: "published"
  },
  {
    title: "Daily Quote Sender – Charge-Up Edition",
    description: "An automated system that sends daily motivational quotes to boost productivity and morale.",
    githubUrl: "https://github.com/monideep2255/daily-quote-sender",
    liveUrl: "https://dailyquoteblaster.netlify.app",
    featured: false,
    patternSeed: 45678,
    categories: ["Automation"],
    tags: ["Automation", "Motivation", "Productivity"],
    status: "published"
  },
  {
    title: "Content Simplifier",
    description: "An AI-powered tool that turns complex text, web pages, and files into clear, plain-language explanations with real-world analogies. Supports follow-up questions and a searchable history, powered by the DeepSeek API.",
    githubUrl: "https://github.com/monideep2255/content_simplified",
    liveUrl: "https://content-simplified.onrender.com",
    featured: true,
    patternSeed: 56789,
    categories: ["AI/ML", "Web Development"],
    tags: ["AI", "DeepSeek", "React"],
    status: "published"
  },
  {
    title: "Prompt Engineering Practice Lab",
    description: "An AI-powered coaching tool for writing better prompts. Submit a prompt and it scores clarity, specificity, task alignment, and completeness, returns written feedback and an improved version, and can pull retrieval-augmented context from an expert content library. Powered by the DeepSeek API.",
    githubUrl: "https://github.com/monideep2255/prompt_engineering_practice",
    liveUrl: "https://prompt-engineering-practice.onrender.com",
    featured: true,
    patternSeed: 67890,
    categories: ["AI/ML", "Web Development"],
    tags: ["AI", "DeepSeek", "Prompt Engineering"],
    status: "published"
  }
];

async function seedProduction() {
  console.log('=== Production Database Seeding ===');
  
  try {
    // Check if projects already exist
    const existingProjects = await db.select().from(projects).limit(1);
    
    if (existingProjects.length > 0) {
      console.log('Projects already exist in database, skipping seed');
      return;
    }
    
    console.log('Seeding database with your actual projects...');
    
    for (const project of actualProjects) {
      await db.insert(projects).values(project);
      console.log(`Added project: ${project.title}`);
    }
    
    console.log('Database seeding completed successfully');
    
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
}

seedProduction().then(() => {
  console.log('Seeding process completed');
  process.exit(0);
}).catch(error => {
  console.error('Seeding process failed:', error);
  process.exit(1);
});