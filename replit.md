# Personal Portfolio Website - Replit.md

## Overview

This is a modern, full-stack personal portfolio website built with React, Express, and PostgreSQL. The application features a responsive design with project showcase capabilities, contact form functionality, and a complete admin dashboard for content management. The system is designed for deployment on both Replit and Netlify platforms.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: React Query (@tanstack/react-query) for server state management
- **Routing**: Client-side routing for SPA functionality
- **Theme System**: Dark/light mode toggle with persistent preferences

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with tsx for development
- **API**: RESTful API endpoints for all data operations
- **Session Management**: Express session middleware with secure cookie configuration
- **Authentication**: Custom authentication system with environment-based credentials

### Database Architecture
- **Primary Database**: PostgreSQL via Neon Database (serverless-compatible)
- **ORM**: Drizzle ORM with HTTP adapter for serverless environments
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Migration Strategy**: Database migrations through Drizzle Kit

## Key Components

### Core Tables
1. **Projects**: Stores portfolio projects with metadata, categories, tags, and status
2. **Contact Messages**: Handles form submissions from visitors
3. **Analytics**: Tracks user interactions and page views

### Authentication System
- Environment variable-based admin credentials (ADMIN_USERNAME, ADMIN_PASSWORD)
- Session-based authentication with secure cookie settings
- Protected routes for admin functionality

### Project Management
- Full CRUD operations for projects
- Featured project highlighting
- Category and tag-based organization
- Draft/published status management
- Pattern seed generation for visual variety

### Email Integration
- Contact form notifications via Nodemailer
- Gmail SMTP configuration with app-specific passwords
- Error handling for email delivery failures

## Data Flow

1. **Client Requests**: Frontend makes API calls using React Query
2. **API Processing**: Express routes handle requests with validation
3. **Database Operations**: Drizzle ORM executes type-safe database queries
4. **Response Handling**: JSON responses with proper error handling
5. **State Updates**: React Query manages cache invalidation and updates

## External Dependencies

### Production Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL connection
- **@radix-ui/***: Headless UI components for accessibility
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Type-safe ORM
- **express**: Web application framework
- **nodemailer**: Email sending functionality
- **zod**: Runtime type validation

### Development Dependencies
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution for development
- **tailwindcss**: Utility-first CSS framework
- **esbuild**: Fast JavaScript bundler for server code

## Deployment Strategy

### Replit Deployment
- Multiple production entry points (main.js, app.cjs, prod.js) to bypass .replit dev restrictions
- Environment-aware configuration that detects deployment vs development
- Production build process that bundles both frontend and backend
- Port configuration for Replit's cloud environment

### Netlify Deployment
- Serverless functions in `/netlify/functions/` directory
- HTTP-based database adapter for serverless compatibility
- Static site generation with API route proxying
- Environment variable configuration for production secrets

### Build Process
1. **Frontend Build**: Vite compiles React app to static assets
2. **Backend Build**: esbuild bundles TypeScript server to ESM
3. **Asset Management**: Static files served from server/public directory
4. **Production Optimization**: Minification and tree-shaking applied

### Environment Configuration
- **Development**: Uses tsx for hot reloading and TypeScript execution
- **Production**: Compiled JavaScript with NODE_ENV=production
- **Database**: Neon PostgreSQL with SSL in production
- **Sessions**: Secure cookies and session secrets in production

## Changelog
- June 24, 2025: Initial setup
- June 24, 2025: Fixed deployment configuration - created production scripts to bypass .replit dev command restriction

## User Preferences

Preferred communication style: Simple, everyday language.