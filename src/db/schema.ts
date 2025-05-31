import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  clerk_id: varchar({ length: 255 }).notNull().unique(),
  username: text(),
  first_name: text(),
  last_name: text(),
  avatar_url: text(),
  email: varchar({ length: 320 }).unique().notNull(), // email max length 64 (before @), 255 domain part.
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const booksTable = pgTable("books", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text().notNull(),

  subtitle: text().default("Unknown"), // ✅ placeholder
  authors: text()
    .array()
    .default(sql`ARRAY[]::text[]`), // ✅ empty array
  publisher: text().default("Unknown"),
  published_date: text().default("Unknown"),
  isbn_10: text().default("N/A"),
  isbn_13: text().default("N/A"),
  page_count: integer().default(0),
  cover_url: text().default(""),
  categories: text()
    .array()
    .default(sql`ARRAY[]::text[]`),
  language: text().default("Unknown"),
  info_link: text().default(""),
  description: text().default("No description available"),
  created_at: timestamp({ withTimezone: true }).defaultNow(),

  user_id: text()
    .notNull()
    .default(sql`auth.user_id()`),
});

export const librariesTable = pgTable("libraries", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text()
    .notNull()
    .default(sql`auth.user_id()`),
  name: text().notNull(),
  description: text(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const libraryBooksTable = pgTable("libraryBooks", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  library_id: uuid()
    .notNull()
    .references(() => librariesTable.id, { onDelete: "cascade" }),
  book_id: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  added_at: timestamp({ withTimezone: true }).defaultNow(),
  reading_status: text({
    enum: ["not_started", "reading", "finished"],
  }).default("not_started"),
  current_page: numeric().default('0'),
  notes: text(),
});

export const sharedBooksTable = pgTable(
  "sharedBooks",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    book_id: uuid()
      .notNull()
      .references(() => booksTable.id, { onDelete: "cascade" }),
    shared_with: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    shared_at: timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [unique().on(table.book_id, table.shared_with)]
);

export const sharedLibrariesTable = pgTable(
  "sharedLibraries",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    library_id: uuid()
      .notNull()
      .references(() => librariesTable.id, { onDelete: "cascade" }),
    shared_with: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    can_edit: boolean().default(false),
    shared_at: timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [unique().on(table.library_id, table.shared_with)]
);

export const tagsTable = pgTable("tabs", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: uuid().unique().notNull(),
  create_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const bookTagsTable = pgTable(
  "bookTags",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    book_id: uuid()
      .notNull()
      .references(() => booksTable.id, { onDelete: "cascade" }),
    tag_id: uuid()
      .notNull()
      .references(() => tagsTable.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.book_id, table.tag_id)]
);

export const bookNotesTable = pgTable("bookNotes", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  book_id: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  user_id: text()
    .notNull()
    .default(sql`auth.user_id()`),
  note: text().notNull(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});

export const activityLogTable = pgTable("activityLog", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  user_id: text()
    .notNull()
    .default(sql`auth.user_id()`),
  action: text().notNull(),
  book_id: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  library_id: uuid()
    .notNull()
    .references(() => librariesTable.id, { onDelete: "cascade" }),
  details: jsonb(),
  created_at: timestamp({ withTimezone: true }).defaultNow(),
});
