# Personal Portfolio Website

### Link To Project
[Portfolio](https://personal-portfolio-monideepchakrab.replit.app/)

### Project Overview
A modern, responsive personal portfolio management system designed for seamless project showcase and administration.

Key Technologies:
- Next.js frontend framework
- Tailwind CSS for styling
- React for component-based architecture
- PostgreSQL database integration
- Authentication and protected routes
- Admin interface for project management
- Flexible project image handling
- Responsive design with intuitive user experience

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

#### Phase 4: Additional Enhancements & Deployment (🚧 In Progress)
- Image Upload: Planning to add image upload functionality for projects
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
- Image Upload System: Implement secure image upload and storage
- Email Notifications: Set up email service for form submissions
- Content Management System (CMS): Consider a headless CMS for better project/blog management
- Website Analytics: Track visitor metrics and engagement with a dashboard
- Minor changes: Add background picture and improve text on the website

## 🛠️ Local Development Setup

### Prerequisites
- Node.js v20.18.1 or higher
- PostgreSQL database
- npm v10.x or higher

### Installation & Development

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

5. Open [http://localhost:5000](http://localhost:5000) in your browser

## 📝 Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── lib/
│   │   └── hooks/
├── server/
│   ├── routes.ts
│   ├── storage.ts
│   └── db.ts
└── shared/
    └── schema.ts
```

## 🤝 Contributing

This is a personal portfolio project, but if you find any bugs or have suggestions for improvements, feel free to open an issue.

## 📄 License

This project is private and not licensed for public use.

Last Updated: March 20, 2025

### Alternative Free Deployment Options

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

Note: For optimal development experience and seamless deployment, we recommend using Replit's built-in deployment features.

### 🚀 Deployment

#### Recommended: Deploy on Replit (Free & Easy)
1. Click the "Deploy" button in the Replit workspace
2. Choose "Static Deploy" for the frontend (it's free and fast)
3. Configure your deployment settings if needed
4. Click "Deploy" to publish your site
5. Your site will be live at `your-repl-name.replit.app`

#### Self-Hosting Setup
If you need to run this project on your own machine during development:

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```env
DATABASE_URL=your_postgresql_database_url
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
```

3. Start development server:
```bash
npm run dev
```

The site will be accessible at `http://0.0.0.0:5000`

### Features
- Full project management system with CRUD operations
- Protected admin routes with authentication
- Search and filter functionality for projects
- Responsive design for all screen sizes
- Dark/light theme support

Last Updated: March 25, 2025