import { pgTable, text, serial, varchar, boolean, integer } from "drizzle-orm/pg-core";
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
  githubUrl: varchar("github_url", { length: 255 }),
  liveUrl: varchar("live_url", { length: 255 }),
  patternSeed: integer("pattern_seed"),
  featured: boolean("featured").default(false),
  categories: text("categories").array().default([]),
  tags: text("tags").array().default([]),
  status: varchar("status", { length: 20 }).default("published"),
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
  patternSeed: true,
  featured: true,
  categories: true,
  tags: true,
  status: true,
}).extend({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  githubUrl: z.string().url("Invalid URL").optional().nullable(),
  liveUrl: z.string().url("Invalid URL").optional().nullable(),
  patternSeed: z.number().optional(),
  featured: z.boolean().default(false),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(["draft", "published"]).default("published"),
});

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;