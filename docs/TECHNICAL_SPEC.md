
# Technical Specification Document
## Personal Portfolio Website

## Current status (July 2026): architecture as built

This original spec is kept for history. Some details below are out of date. The as-built app was migrated off Replit to a free serverless stack:

- Frontend: React with Vite (not Next.js), served static by Netlify.
- API: the Express app runs as a single Netlify Function via serverless-http.
- Database: Neon serverless Postgres via Drizzle ORM.
- Auth: express-session with a Postgres session store (connect-pg-simple).
- Email: Resend (contact form).

For setup and tests, see [../README.md](../README.md) and [test-cases.md](test-cases.md). Live site: https://monideep-portfolio.netlify.app

### System Architecture

#### Frontend Architecture
- **Framework**: Next.js with React 18
- **State Management**: React Query for server state, React Context for theme
- **Styling**: Tailwind CSS with shadcn/ui components
- **Animations**: Framer Motion
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

#### Backend Architecture
- **Runtime**: Node.js v20.18.1
- **Server**: Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js with session-based auth
- **File Storage**: Local file system with type-safe handlers

### Core Features Implementation

#### Authentication System
- Session-based authentication using express-session
- Secure cookie management with production configuration
- Protected routes middleware implementation
- Admin-only access control for content management

#### Project Management
- CRUD operations for project entries
- Image upload functionality with validation
- Real-time preview system
- Draft/Published status management
- Tagging and categorization system

#### Analytics System
- Page view tracking implementation
- Session-based visitor analytics
- Real-time traffic monitoring
- Data visualization using Recharts
- Secure analytics data access

#### Content Management
- Rich text editing capabilities
- Image upload and optimization
- Content preview system
- Draft/publish workflow
- Category and tag management

### Security Implementation

#### Authentication
```typescript
interface AuthConfig {
  session: {
    secret: string;
    secure: boolean;
    maxAge: number;
  };
  admin: {
    username: string;
    password: string;
  };
}
```

#### API Security
- CSRF protection
- Rate limiting
- Input validation using Zod
- Secure file upload validation
- Session management

### Database Schema

#### Projects Table
```typescript
interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  status: 'draft' | 'published';
  createdAt: Date;
  updatedAt: Date;
}
```

#### Analytics Table
```typescript
interface Analytics {
  id: string;
  pageUrl: string;
  visitorId: string;
  timestamp: Date;
  sessionId: string;
}
```

### API Endpoints

#### Project Management
- `GET /api/projects`: List all projects
- `POST /api/projects`: Create new project
- `PUT /api/projects/:id`: Update project
- `DELETE /api/projects/:id`: Delete project
- `POST /api/projects/:id/publish`: Publish project
- `POST /api/upload`: Handle file uploads

#### Analytics
- `GET /api/analytics`: Get analytics data
- `POST /api/analytics/track`: Track page view
- `GET /api/analytics/realtime`: Get real-time visitors

### Performance Optimizations
- Image optimization and lazy loading
- Component code splitting
- Server-side caching
- Optimized database queries
- Lighthouse score optimization

### Development Tooling
- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Vite for development server
- Drizzle for database migrations

### Deployment Configuration
- Production build optimization
- Environment variable management
- Database connection pooling
- Static asset serving
- Error handling and logging

### Future Technical Considerations
- Blog system implementation
- AI chatbot integration
- Newsletter service integration
- Documentation system
- Real-time collaboration features

### System Requirements
- Node.js v20.18.1 or higher
- PostgreSQL database
- Minimum 512MB RAM
- 1GB storage space

### Monitoring & Logging
- Request logging with morgan
- Error tracking
- Performance monitoring
- Analytics data collection
- Real-time system status
