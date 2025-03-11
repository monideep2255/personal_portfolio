import { contactMessages, type ContactMessage, type InsertMessage } from "@shared/schema";
import { db } from "./db";

export interface IStorage {
  createMessage(message: InsertMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async createMessage(insertMessage: InsertMessage): Promise<ContactMessage> {
    const [message] = await db
      .insert(contactMessages)
      .values(insertMessage)
      .returning();
    return message;
  }
}

export const storage = new DatabaseStorage();