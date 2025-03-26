import { contactMessages, projects, analytics, type Project, type InsertProject, type ContactMessage, type InsertMessage, type Analytics, type InsertAnalytics } from "@shared/schema";
import { db } from "./db";
import { eq, gte, lte, desc } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  getFeaturedProjects(): Promise<Project[]>;
  // Contact Messages
  createMessage(message: InsertMessage): Promise<ContactMessage>;
  // Analytics
  createAnalyticsEvent(event: InsertAnalytics): Promise<Analytics>;
  getAnalytics(filters?: { 
    startDate?: Date;
    endDate?: Date;
    eventType?: string;
  }): Promise<Analytics[]>;
}

export class DatabaseStorage implements IStorage {
  // Projects
  async getProjects(): Promise<Project[]> {
    try {
      return await db
        .select()
        .from(projects)
        .orderBy(projects.id);
    } catch (error) {
      console.error("Database error in getProjects:", error);
      throw error;
    }
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    try {
      const [project] = await db
        .select()
        .from(projects)
        .where(eq(projects.id, id));
      return project;
    } catch (error) {
      console.error("Database error in getProjectById:", error);
      throw error;
    }
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    try {
      const [project] = await db
        .insert(projects)
        .values(insertProject)
        .returning();
      return project;
    } catch (error) {
      console.error("Database error in createProject:", error);
      throw error;
    }
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project> {
    try {
      const [project] = await db
        .update(projects)
        .set(projectUpdate)
        .where(eq(projects.id, id))
        .returning();
      return project;
    } catch (error) {
      console.error("Database error in updateProject:", error);
      throw error;
    }
  }

  async deleteProject(id: number): Promise<void> {
    try {
      await db
        .delete(projects)
        .where(eq(projects.id, id));
    } catch (error) {
      console.error("Database error in deleteProject:", error);
      throw error;
    }
  }

  async getFeaturedProjects(): Promise<Project[]> {
    try {
      return await db
        .select()
        .from(projects)
        .where(eq(projects.featured, true))
        .orderBy(projects.id);
    } catch (error) {
      console.error("Database error in getFeaturedProjects:", error);
      throw error;
    }
  }

  // Add contact message method
  async createMessage(message: InsertMessage): Promise<ContactMessage> {
    try {
      const [newMessage] = await db
        .insert(contactMessages)
        .values(message)
        .returning();
      return newMessage;
    } catch (error) {
      console.error("Database error in createMessage:", error);
      throw error;
    }
  }

  // Analytics methods
  async createAnalyticsEvent(event: InsertAnalytics): Promise<Analytics> {
    try {
      const [analyticsEvent] = await db
        .insert(analytics)
        .values(event)
        .returning();
      return analyticsEvent;
    } catch (error) {
      console.error("Database error in createAnalyticsEvent:", error);
      throw error;
    }
  }

  async getAnalytics(filters?: { 
    startDate?: Date;
    endDate?: Date;
    eventType?: string;
  }): Promise<Analytics[]> {
    try {
      let query = db.select().from(analytics);

      if (filters?.startDate) {
        query = query.where(gte(analytics.timestamp, filters.startDate));
      }
      if (filters?.endDate) {
        query = query.where(lte(analytics.timestamp, filters.endDate));
      }
      if (filters?.eventType) {
        query = query.where(eq(analytics.eventType, filters.eventType));
      }

      return await query.orderBy(desc(analytics.timestamp));
    } catch (error) {
      console.error("Database error in getAnalytics:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();