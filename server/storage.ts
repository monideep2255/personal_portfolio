import { projects, type Project, type InsertProject } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;
  getFeaturedProjects(): Promise<Project[]>;
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
}

export const storage = new DatabaseStorage();