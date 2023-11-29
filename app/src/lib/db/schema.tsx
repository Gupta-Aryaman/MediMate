//drizzle orm

import { pgEnum, pgTable, serial, integer, text, timestamp, varchar, } from "drizzle-orm/pg-core";

export const userSystemEnum = pgEnum('user_system_enum', ['user', 'system']);

export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    userId: varchar('user_Id', {length: 256}).notNull(),
    chat_name: text('chat_name').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
});

const chatMessages = pgTable('chat_messages', {
    id: serial('id').primaryKey(),
    chat_id: integer('chat_id').references(() => chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('createdAt').notNull().defaultNow(),
    role: userSystemEnum('role').notNull()
});

export { chatMessages };
