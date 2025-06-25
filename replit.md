# Replit.md

## Overview
This is a full-stack personal portfolio website built with React, Express.js, and PostgreSQL. The application features a modern, responsive design with both public portfolio showcase and protected admin functionality for content management. The system includes project management, contact form handling, analytics tracking, and a complete authentication system.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for smooth transitions
- **Form Handling**: React Hook Form with Zod validation
- **Theme System**: next-themes for dark/light mode support
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: Session-based authentication with express-session
- **Email Service**: Nodemailer with Gmail SMTP for contact notifications
- **File Structure**: TypeScript throughout with ESM modules

### Database Schema
- **Projects Table**: Stores project information with categories, tags, featured status
- **Contact Messages Table**: Stores contact form submissions
- **Analytics Table**: Tracks page views and user interactions

## Key Components

### Public Routes
- **Home Page**: Hero section with personal introduction and call-to-actions
- **About Page**: Professional experience, skills, and background information
- **Projects Page**: Filterable project showcase with search functionality
- **Contact Page**: Contact form with database persistence and email notifications

### Admin Dashboard (Protected)
- **Login System**: Secure authentication for admin access
- **Project Management**: Full CRUD operations for projects
- **Analytics Dashboard**: Real-time visitor analytics with visualizations
- **Content Management**: Draft/publish workflow for projects

### Core Features
- **Responsive Design**: Mobile-first design approach with Tailwind CSS
- **Theme Toggle**: Persistent dark/light mode switching
- **Search & Filter**: Project filtering by category and search terms
- **Pattern Generation**: Deterministic visual patterns for project cards
- **Error Boundaries**: Comprehensive error handling and user feedback

## Data Flow

### Authentication Flow
1. Admin login credentials validated against environment variables
2. Session established with secure cookies
3. Protected routes check authentication status
4. Automatic logout on session expiration

### Project Management Flow
1. Admin creates/edits projects through forms
2. Data validated with Zod schemas
3. Database operations handled through Drizzle ORM
4. Real-time UI updates via React Query cache invalidation

### Analytics Flow
1. Page views automatically tracked on route changes
2. Analytics data stored with session IDs and metadata
3. Admin dashboard displays aggregated analytics data
4. Real-time updates every 30 seconds

## External Dependencies

### Production Dependencies
- **Database**: Neon PostgreSQL (serverless)
- **Email Service**: Gmail SMTP via Nodemailer
- **UI Components**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React and React Icons
- **Charts**: Recharts for analytics visualization

### Development Tools
- **TypeScript**: Full type safety across frontend and backend
- **ESBuild**: Fast backend bundling for production
- **TSX**: TypeScript execution for development
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Replit Deployment
- **Environment Detection**: Smart detection of deployment vs development
- **Production Build**: Automatic building when deployed to production
- **Environment Variables**: Secure handling of database URLs and credentials
- **Health Checks**: Docker health check endpoint for monitoring

### Build Process
1. Frontend built with Vite (static assets to dist/public)
2. Backend bundled with ESBuild (server code to dist/index.js)
3. Production server serves both frontend assets and API endpoints
4. Environment variables configure database connections and email services

### Configuration Files
- **Docker**: Multi-stage build with Node.js 20 Alpine
- **Cloud Build**: Google Cloud Run deployment configuration
- **Replit**: Smart development/production mode detection

## Changelog
- June 25, 2025. Initial setup

## User Preferences
Preferred communication style: Simple, everyday language.