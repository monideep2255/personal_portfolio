# Personal portfolio

Live site: https://monideep-portfolio.netlify.app

A portfolio website with a public site and a private admin panel. Visitors browse projects and send a contact message. The owner logs in to manage projects and view analytics.

- Live app: https://monideep-portfolio.netlify.app
- How to try it: [docs/test-cases.md](docs/test-cases.md)

*Last updated: July 20, 2026. Migrated off Replit to a free serverless stack (Netlify + Neon).*

## Contents

- [What it does](#what-it-does)
- [Architecture](#architecture)
- [How to run it yourself](#how-to-run-it-yourself)
- [Local development](#local-development)
- [Project structure](#project-structure)

## What it does

- Public site: a project showcase (with featured projects) and a contact form.
- Admin panel: log in to create, edit, and delete projects, and to view page-view analytics.
- Contact form: saves the message to the database and emails the owner.

## Architecture

Everything runs on free tiers with no always-on server.

- Frontend: a React (Vite) single-page app in `client/`, built to `dist/public` and served static by Netlify.
- API: the whole Express app runs as a single Netlify Function (`netlify/api-functions/api.ts`), wrapped with `serverless-http`. Netlify bundles the TypeScript source directly. `/api/*` is routed to it.
- Database: Neon serverless Postgres via Drizzle ORM. Tables: `projects`, `contact_messages`, `analytics`, and `session` (admin login sessions).
- Auth: `express-session` with a Postgres session store (`connect-pg-simple`). The admin username and password are environment variables.
- Email: the contact form sends through Resend.

Why a function instead of a server: the public site is static and instant, and the API only spins up when called. Nothing runs 24/7, so it all fits in free tiers.

## How to run it yourself

You need a free Neon database and a free Resend account.

### 1. Database on Neon

1. Create a free project at [neon.tech](https://neon.tech/) and copy the connection string. This is `DATABASE_URL`.
2. Create the application tables:
   ```
   DATABASE_URL="postgres://..." npm run db:push
   ```
   This creates `projects`, `contact_messages`, `analytics`, and the `session` table (defined in `shared/schema.ts`).
3. Optionally seed the project list:
   ```
   DATABASE_URL="postgres://..." npm run seed
   ```

Note on the session table: connect-pg-simple's own auto-create is disabled because its built-in schema uses a Postgres clause newer servers reject. The `session` table is created by `npm run db:push` instead. If you ever need it by hand:
```sql
CREATE TABLE IF NOT EXISTS "session" (
  "sid" varchar NOT NULL COLLATE "default" PRIMARY KEY,
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
);
CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
```

### 2. Deploy on Netlify

1. Add a new site and import this repository (or deploy with the Netlify CLI).
2. Build settings come from `netlify.toml` (build `npm run build:netlify`, publish `dist/public`, functions `netlify/api-functions`).
3. Set these environment variables in Netlify (Site settings, Environment variables):
   - `DATABASE_URL` (Neon)
   - `SESSION_SECRET` (a long random string)
   - `ADMIN_USERNAME` and `ADMIN_PASSWORD` (your admin login)
   - `RESEND_API_KEY` (from [resend.com](https://resend.com/))
   - `SENDER_EMAIL` (a verified Resend sender, or `onboarding@resend.dev` for testing)
   - `CONTACT_TO_EMAIL` (where contact submissions are sent)
   - `NODE_ENV` set to `production` (enables secure session cookies)
4. Deploy.

Sender note: `onboarding@resend.dev` only delivers to the Resend account owner's email, which is fine here because the contact form emails the owner. To send from your own domain, verify it in Resend and change `SENDER_EMAIL`.

## Local development

1. Copy `.env.example` to `.env` and fill in the values. `.env` is gitignored, never commit it.
2. Install dependencies: `npm install`.
3. Run the dev server: `npm run dev` (serves the client and API on one port).

## Project structure

```
personal_portfolio/
├── client/                     # React (Vite) single-page app
├── server/
│   ├── app.ts                  # builds the Express app for serverless (pg session store)
│   ├── index.ts                # local dev server (app.listen)
│   ├── routes.ts               # contact, projects, analytics routes
│   ├── auth.ts                 # admin login, session, requireAuth
│   ├── db.ts                   # Neon + Drizzle connection
│   ├── storage.ts              # database queries
│   └── emailService.ts         # contact email via Resend
├── netlify/api-functions/
│   └── api.ts                  # the Express app as one Netlify Function
├── shared/schema.ts            # Drizzle tables (incl. session) + Zod schemas
├── seed-production.js          # seeds the project list
├── netlify.toml                # Netlify build, functions, redirects
└── .env.example                # environment variable template
```
