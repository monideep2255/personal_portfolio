# Personal Portfolio Website

### Project Overview
A modern, responsive personal portfolio website designed to showcase professional skills and projects with an emphasis on interactive user experience and smooth design transitions.

Key Technologies:
- Next.js frontend framework
- Tailwind CSS for styling
- React Icons library
- Next-themes for dark mode implementation
- PostgreSQL for contact form data storage
- Responsive design with clear section demarcation
- Modular page components for About, Home, and Projects sections
- Updated Projects page with 'Coming Soon' placeholder
- Refined Home page layout

### Phases & Feature Development

#### Phase 1: Initial Setup (✅ Completed) – March 12, 2025

##### Core Website Structure
- Responsive navigation bar with theme toggle
- Home page with hero section
- Projects showcase page
- About page with skills and experience sections
- Contact form with database storage
- Footer with social links

##### Design & UI Improvements
- Professional and clean design
- Responsive layout for all screen sizes
- Dark/light theme support with persistent toggle
- Smooth animations and transitions using Framer Motion
- Consistent typography and spacing

##### Technical Features
- Contact Form Database (PostgreSQL integration, API endpoint, validation with Zod)
- Component Library (Reusable UI components using shadcn/ui)

✅ Functional Status: Navigation, theme switching, contact form, responsive design, project showcase, and about page are implemented.

#### Phase 2: Content & Polish (✅ Completed) – March 20, 2025
✅ Resume Section: Successfully integrated resume content into the About page with clear section demarcation
✅ Home Page Enhancement: Improved layout and content presentation
✅ Projects Section Update: Projects page "Coming Soon" update completed.

#### Phase 3: Dynamic Project Uploads
- Project Management: Enable dynamic project uploads using JSON or database integration
- Admin Content Control: Allow for adding/editing projects without modifying code
- Project Filtering & Search: Implement search and filter functionality

#### Phase 4: Additional Enhancements & Deployment
- Deployment: Deploy the website on Replit
- AI-Powered Resume Summary: Generate a brief bio based on the resume content
- Custom 404 Page: Improve UX with a designed error page
- Performance Optimization: Improve Lighthouse scores (speed, SEO, accessibility)
- Accessibility Features: Ensure ARIA labels, keyboard navigation, and screen-reader support

### Technical Stack
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

### Future Considerations
- Email Notifications: Set up email service for form submissions
- Content Management System (CMS): Consider a headless CMS for better project/blog management
- Website Analytics: Track visitor metrics and engagement with a dashboard

### Notes
- The website is currently in development
- Database is provisioned and running
- All core functionality is working as expected

## 📸 Screenshots

### Home Page
![Home Page]()

### Projects Page
![Projects Page]()

### Resume Section
![Resume Page 1]()
![Resume Page 2]()

Last Updated: March 20, 2025

## 🚀 Getting Started

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

3. Set up environment variables
```env
DATABASE_URL=your_postgresql_database_url
SENDGRID_API_KEY=your_sendgrid_api_key
```

4. Run the development server
```bash
npm run dev
```

6. Access the application at [http://0.0.0.0:5000](http://0.0.0.0:5000) in your browser

The application will start in development mode with hot-reload enabled.

The application will start in development mode with hot-reload enabled.

### 🚀 Deployment

This project can be deployed for free using Replit's deployment options:

1. Click the "Deploy" button in the Replit workspace
2. Choose "Static Deploy" for the frontend (it's free and fast)
3. Configure your deployment settings if needed
4. Click "Deploy" to publish your site
5. Your site will be live at `your-repl-name.replit.app`

### Features
- Full project management system with CRUD operations
- Protected admin routes with authentication
- Search and filter functionality for projects
- Responsive design for all screen sizes
- Dark/light theme support

Last Updated: March 25, 2025