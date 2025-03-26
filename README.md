# Personal Portfolio Website

## Link To Project
[Portfolio](https://personal-portfolio-monideepchakrab.replit.app/)

## Project Overview
A modern, responsive personal portfolio management system designed for seamless project showcase and administration.

### Phases & Feature Development

#### Phase 1: Initial Setup (✅ Completed) – March 12, 2025

#### Core Website Structure
- Responsive navigation bar with theme toggle
- Home page with hero section
- Projects showcase page
- About page with skills and experience sections
- Contact form with database storage
- Footer with social links

#### Design & UI Improvements
- Professional and clean design
- Responsive layout for all screen sizes
- Dark/light theme support with persistent toggle
- Smooth animations and transitions using Framer Motion
- Consistent typography and spacing

#### Technical Features
- Contact Form Database (PostgreSQL integration, API endpoint, validation with Zod)
- Component Library (Reusable UI components using shadcn/ui)
- Functional Status: Navigation, theme switching, contact form, responsive design, project showcase, and about page are implemented.

#### Phase 2: Content & Polish (✅ Completed) – March 20, 2025
- Resume Section: Successfully integrated resume content into the About page with clear section demarcation
- Home Page Enhancement: Improved layout and content presentation
- Projects Section Update: Projects page "Coming Soon" update completed.

#### Phase 3: Dynamic Project Uploads (✅ Completed) – March 25, 2025
- Project Management: Implemented full CRUD operations for project management
- Admin Content Control: Added secure admin interface for project management
- Project Filtering & Search: Implemented search functionality and featured project filter
- Database Integration: Successfully integrated PostgreSQL for project storage
- Protected Routes: Implemented authentication for admin features

#### Phase 4: Additional Enhancements & Deployment (✅ Completed) – March 26, 2025
- Image Upload: Implemented project pattern generation with unique visual identifiers
- Custom 404 Page: Added user-friendly error page with navigation options
- Performance Optimization: Implemented code splitting, lazy loading, and memoization
- Accessibility Features: Added ARIA labels, keyboard navigation, and screen-reader support

#### Phase 5: Future Enhancements (🚧 Planned)
- Email Notifications: Set up email service for form submissions and notifications
- Content Management System (CMS): Implement a headless CMS for better content management
- Website Analytics: Track visitor metrics and engagement with a dashboard
- Image Upload System: Add support for custom project images and media
- Search Enhancement: Implement advanced search with filters and tags


#### Key Technologies:
- Next.js frontend framework
- Tailwind CSS for styling
- React for component-based architecture
- PostgreSQL database integration
- Authentication and protected routes
- Admin interface for project management
- Flexible project image handling
- Responsive design with intuitive user experience

#### Technical Stack
- **Frontend**
  - Next.js
  - React
  - Tailwind CSS
  - Framer Motion
  - shadcn/ui components
  - React Query
  - Zod

- **Backend**
  - Express.js server
  - PostgreSQL database
  - Drizzle ORM
  - TypeScript

## 🛠️ Local Development Setup

### Prerequisites
- Node.js v20.18.1 or higher
- PostgreSQL database
- npm v10.x or higher

### Installation & Setup

1. Clone the repository
```bash
git clone https://github.com/monideep2255/personal_portfolio.git
cd personal_portfolio
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables by creating a `.env` file:
```env
DATABASE_URL=your_postgresql_database_url
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

4. Initialize the database
```bash
npm run db:push
```

5. Start the development server
```bash
npm run dev
```

6. Access the application at [http://0.0.0.0:5000](http://0.0.0.0:5000) in your browser

The application will start in development mode with hot-reload enabled.
The application will start in development mode with hot-reload enabled.


## 🚀 Deployment

Note: For optimal development experience and seamless deployment, we recommend using Replit's built-in deployment features.

#### Recommended: Deploy on Replit (Free & Easy)
1. Click the "Deploy" button in the Replit workspace
2. Choose "Static Deploy" for the frontend (it's free and fast)
3. Configure your deployment settings if needed
4. Click "Deploy" to publish your site
5. Your site will be live at `your-repl-name.replit.app`

#### Alternative Free Deployment Options

While Replit offers the most streamlined deployment experience, here are other free options:

1. **Render.com**
   - Create a new Web Service
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set start command: `npm run start`
   - Add your environment variables
   - Deploy

2. **Railway.app**
   - Connect your GitHub repository
   - Configure environment variables
   - Railway will auto-detect build settings
   - Deploy

3. **Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Configure environment variables
   - Deploy

Last Updated: March 26, 2025