// Builds the Express app for serverless (Netlify Function) use.
//
// Differences from server/index.ts (the local dev server):
// - Session state is stored in Postgres via connect-pg-simple, not the default
//   in-memory store. A serverless function is a fresh process per invocation,
//   so an in-memory session store would lose logins immediately.
// - trust proxy is enabled so secure cookies work behind the Netlify proxy.
// - No app.listen and no static/vite serving. Netlify serves the static client;
//   this app only handles /api routes, wrapped by serverless-http in the handler.

import express from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { registerRoutes } from "./routes";
import { configureAuth } from "./auth";

export async function createApp() {
  const app = express();

  // Behind the Netlify proxy; needed for secure cookies to be set.
  app.set("trust proxy", 1);

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  const PgSession = connectPgSimple(session);
  app.use(
    session({
      store: new PgSession({
        pool,
        // The session table is created by drizzle (see shared/schema.ts), not by
        // connect-pg-simple, whose built-in create uses a Postgres clause newer
        // servers reject. See also the manual SQL in the README setup steps.
        createTableIfMissing: false,
      }),
      secret: process.env.SESSION_SECRET || "dev-only-insecure-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    }),
  );

  // Admin login, status, logout routes.
  configureAuth(app);

  // Contact, projects, analytics routes. registerRoutes mutates app in place
  // and returns an http.Server we do not use in serverless.
  await registerRoutes(app);

  return app;
}
