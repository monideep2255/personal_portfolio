import { pgTable, text, serial, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  message: text("message").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description").notNull(),
  githubUrl: varchar("github_url", { length: 255 }).notNull(),
  liveUrl: varchar("live_url", { length: 255 }),
  featured: boolean("featured").default(false),
});

// Contact Message schemas
export const insertMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  message: true,
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

// Project schemas
export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  githubUrl: true,
  liveUrl: true,
  featured: true,
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;