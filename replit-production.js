#!/usr/bin/env node

// Optimized production server for Replit deployment
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { registerRoutes } from './server/routes.js';
import { configureAuth } from './server/auth.js';
import session from 'express-session';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// Production configuration
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'production-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    maxAge: 24 * 60 * 60 * 1000
  }
}));

// Configure authentication
configureAuth(app);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    environment: 'production',
    timestamp: new Date().toISOString()
  });
});

// Serve static files from client build
const clientBuildPath = join(__dirname, 'client', 'dist');
if (existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
} else {
  // Fallback: serve directly from client/src for development-like deployment
  app.use('/src', express.static(join(__dirname, 'client', 'src')));
  app.use('/assets', express.static(join(__dirname, 'client', 'src', 'assets')));
}

// Register API routes
await registerRoutes(app);

// Serve index.html for all non-API routes
app.get('*', (req, res) => {
  const indexPath = join(clientBuildPath, 'index.html');
  if (existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    // Fallback HTML for development-like deployment
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Portfolio</title>
          <script type="module" crossorigin src="/src/main.tsx"></script>
        </head>
        <body>
          <div id="root"></div>
        </body>
      </html>
    `);
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const port = process.env.PORT || 5000;
const server = app.listen(port, '0.0.0.0', () => {
  console.log(`Production server running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;