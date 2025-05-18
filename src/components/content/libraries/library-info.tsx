/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { toast } from "sonner";
import LibraryInfoTable from "./library-info-table";
import { getDb } from "@/db";
import { booksTable, librariesTable, libraryBooksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const LibraryInfo = async ({ libId }: any) => {
  const db = await getDb();
  let library;
  try {
    library = await db
      .select({
        name: librariesTable.name,
        description: librariesTable.description,
      })
      .from(librariesTable)
      .where(eq(librariesTable.id, libId))
      .limit(1);
  } catch (error) {
    toast.error("Something went wrong");
    return <p className="text-destructive italic">Error: {String(error)}</p>;
  }

  // 2. Get all books inside that library
  let books;
  try {
    books = await db
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
  } catch (error) {
    toast.error("Something went wrong!");
    return <p className="text-destructive italic">Error: {String(error)}</p>;
  }

  return (
    <>
      <p className="text-8xl font-semibold pb-2">{library[0]?.name}</p>
      <p className="italic pb-10">{library[0]?.description}</p>
      <LibraryInfoTable libraryBooks={books} />
    </>
  );
};

export default LibraryInfo;
