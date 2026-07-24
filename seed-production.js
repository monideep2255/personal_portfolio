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
    description: "An AI-powered company research assistant for value investing. Pull a company's SEC filing from EDGAR or upload a PDF, then generate insight cards on the business, moat, financial health, management, risks, and valuation, compare two companies, and export the analysis to PDF.",
    githubUrl: "https://github.com/monideep2255/InsightLens",
    liveUrl: "https://insightlens-wz4n.onrender.com",
    featured: false,
    patternSeed: 34567,
    categories: ["AI/ML", "FinTech"],
    tags: ["AI", "Value Investing", "SEC Filings"],
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
  },
  {
    title: "AI Research Partner",
    description: "An AI research assistant that helps academics review manuscripts. Upload or paste a paper, get an executive summary and section breakdown, ask questions grounded in the document, then generate and export a full review as PDF or Word. Voice input via Whisper, powered by OpenAI GPT-4o.",
    githubUrl: "https://github.com/monideep2255/ai_research_assistant",
    liveUrl: "https://ai-research-assistant-zo39.onrender.com",
    featured: false,
    patternSeed: 78901,
    categories: ["AI/ML", "Web Development"],
    tags: ["AI", "OpenAI", "Research"],
    status: "published"
  },
  {
    title: "ChessMate",
    description: "An interactive chess learning app. Work through nine piece and rule tutorials with lessons, exercises, and quizzes, play on a full board with legal-move validation, hints, and threat highlighting, and practice against a local client-side opponent across four difficulty levels. Accounts, saved games, statistics, and puzzles persist in Postgres.",
    githubUrl: "https://github.com/monideep2255/replit-chess-master",
    liveUrl: "https://chessmate-6vy7.onrender.com",
    featured: false,
    patternSeed: 89012,
    categories: ["Web Development"],
    tags: ["Chess", "React", "TypeScript"],
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