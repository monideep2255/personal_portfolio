import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Production-ready database configuration
const connectionConfig = {
  connectionString: process.env.DATABASE_URL,
  // Always enable SSL for Neon
  ssl: { rejectUnauthorized: false }
};

export const pool = new Pool(connectionConfig);
export const db = drizzle({ client: pool, schema });
