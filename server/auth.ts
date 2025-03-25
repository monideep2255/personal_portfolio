import type { Express, Request, Response, NextFunction } from "express";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string(),
  password: z.string()
});

export function configureAuth(app: Express) {
  // Login endpoint
  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);

      if (
        credentials.username === process.env.ADMIN_USERNAME &&
        credentials.password === process.env.ADMIN_PASSWORD
      ) {
        req.session.isAuthenticated = true;
        res.json({ success: true });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid request" });
    }
  });

  // Check auth status endpoint
  app.get("/api/auth/status", (req, res) => {
    res.json({ isAuthenticated: req.session.isAuthenticated === true });
  });

  // Logout endpoint
  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ message: "Failed to logout" });
      } else {
        res.json({ success: true });
      }
    });
  });
}

// Middleware to protect admin routes
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.isAuthenticated === true) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
}