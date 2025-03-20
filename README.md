
# Product Requirements Document (PRD)
## Personal Portfolio Website

A modern, responsive personal portfolio website designed to showcase professional skills and projects with an emphasis on interactive user experience and smooth design transitions.

## 🚀 Features

- Modern, responsive design with clear section demarcation
- Dark/light theme support
- Interactive animations and transitions
- Contact form with PostgreSQL database integration
- Organized About section with professional experience
- Projects showcase section
- Mobile-friendly layout

## 🛠️ Tech Stack

### Frontend
- Next.js
- React
- Tailwind CSS
- Framer Motion
- shadcn/ui components
- React Query
- Zod for form validation

- **Backend**
  - Express.js server
  - PostgreSQL database
  - Drizzle ORM
  - TypeScript

## 📋 Current Status

### Completed Features (Phase 1 & 2)
✅ Core Website Structure
- Responsive navigation bar with theme toggle
- Home page with professional introduction
- Projects showcase page with "Coming Soon" placeholder
- About page with skills and experience sections
- Contact form with database storage
- Footer with social links

✅ Design & UI
- Professional and clean design
- Dark/light theme implementation
- Smooth animations using Framer Motion
- Consistent typography and spacing

✅ Technical Features
- PostgreSQL database integration
- API endpoint setup
- Form validation with Zod
- Reusable UI components

### Upcoming Features (Phase 3 & 4)
- Dynamic project management system
- Blog section
- Newsletter signup
- Performance optimization
- Accessibility improvements

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
```

4. Run the development server
```bash
npm run dev
```

5. Open [http://localhost:5000](http://localhost:5000) in your browser
