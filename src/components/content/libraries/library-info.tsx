/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import LibraryInfoTable from "./library-info-table";
import { getDb } from "@/db";
import { booksTable, librariesTable, libraryBooksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

const LibraryInfo = async ({ libId }: any) => {
  const db = await getDb();
  try {
    const library = await db
      .select({
        name: librariesTable.name,
        description: librariesTable.description,
      })
      .from(librariesTable)
      .where(eq(librariesTable.id, libId))
      .limit(1);

    if (library.length === 0) return notFound();
    // 2. Get all books inside that library
    const books = await db
      .select({
        reading_status: libraryBooksTable.reading_status,
        book: {
          id: booksTable.id,
          title: booksTable.title,
          authors: booksTable.authors,
          published_date: booksTable.published_date,
        },
      })
      .from(libraryBooksTable)
      .innerJoin(booksTable, eq(libraryBooksTable.book_id, booksTable.id))
      .where(eq(libraryBooksTable.library_id, libId));
    return (
      <>
        <p className="text-8xl font-semibold pb-2">{library[0]?.name}</p>
        <p className="italic pb-10">{library[0]?.description}</p>
        <LibraryInfoTable libraryBooks={books} />
      </>
    );
  } catch (error) {
    console.error("Failed to load library info:", error);
    return notFound()
  }
};

export default LibraryInfo;
