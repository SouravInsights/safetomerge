import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";

export type FormAnswerValue =
  | string
  | number
  | boolean
  | string[]
  | { [key: string]: string | number | boolean | string[] | null }
  | null;

export type FormAnswers = Record<string, FormAnswerValue>;

export const contributions = pgTable("contributions", {
  id: uuid("id").defaultRandom().primaryKey(),

  // Core Indexable Metadata
  contactEmail: text("contact_email"),
  formVersion: text("form_version").default("v1").notNull(),

  // Flexible Document Payload (all current and future form fields)
  answers: jsonb("answers").$type<FormAnswers>().notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Contribution = typeof contributions.$inferSelect;
export type NewContribution = typeof contributions.$inferInsert;
