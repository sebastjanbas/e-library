import { sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
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
  username: varchar({ length: 20 }),
  firstName: text(),
  lastName: text(),
  avararUrl: text(),
  email: varchar({ length: 320 }).unique().notNull(), // email max length 64 (before @), 255 domain part.
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow(), // FIX: need to create a postgres trigger to auto-update
});

export const booksTable = pgTable("books", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),

  title: text().notNull(),
  authors: text().array(),
  publisher: text(),
  publishedDate: text(),
  isbn10: text(),
  isbn13: text(),
  pageCount: integer(),
  coverUrl: text(),
  description: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),

  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
});

export const librariesTable = pgTable("libraries", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  name: text().notNull(),
  description: text(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
});

export const libraryBooksTable = pgTable("libraryBooks", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  libraryId: uuid()
    .notNull()
    .references(() => librariesTable.id, { onDelete: "cascade" }),
  bookId: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  addedAt: timestamp({ withTimezone: true }).defaultNow(),
  readingStatus: text({ enum: ["not_started", "reading", "finished"] }).default(
    "not_started",
  ),
  notes: text(),
});

export const sharedBooksTable = pgTable(
  "sharedBooks",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    bookId: uuid()
      .notNull()
      .references(() => booksTable.id, { onDelete: "cascade" }),
    sharedWith: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    sharedAt: timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [unique().on(table.bookId, table.sharedWith)],
);

export const sharedLibrariesTable = pgTable(
  "sharedLibraries",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    libraryId: uuid()
      .notNull()
      .references(() => librariesTable.id, { onDelete: "cascade" }),
    sharedWith: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    canEdit: boolean().default(false),
    sharedAt: timestamp({ withTimezone: true }).defaultNow(),
  },
  (table) => [unique().on(table.libraryId, table.sharedWith)],
);

export const tagsTable = pgTable("tabs", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: uuid().unique().notNull(),
  createAt: timestamp({ withTimezone: true }).defaultNow(),
});

export const bookTagsTable = pgTable(
  "bookTags",
  {
    id: uuid()
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    bookId: uuid()
      .notNull()
      .references(() => booksTable.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => tagsTable.id, { onDelete: "cascade" }),
  },
  (table) => [unique().on(table.bookId, table.tagId)],
);

export const bookNotesTable = pgTable("bookNotes", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  bookId: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  note: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
});

export const activityLogTable = pgTable("activityLog", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  userId: uuid()
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  action: text().notNull(),
  bookId: uuid()
    .notNull()
    .references(() => booksTable.id, { onDelete: "cascade" }),
  libraryId: uuid()
    .notNull()
    .references(() => librariesTable.id, { onDelete: "cascade" }),
  details: jsonb(),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
});
