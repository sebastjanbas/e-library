import { getDb } from "@/db";
import { booksTable, libraryBooksTable } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import React from "react";
import BookListClient from "./book-list-client";

const BookList = async () => {
  const db = await getDb();
  // const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))
  let books;
  let total;
  try {
    // await wait(5000)
    books = await db
      .select({
        reading_status: libraryBooksTable.reading_status,
        current_page: libraryBooksTable.current_page,
        book: {
          id: booksTable.id,
          title: booksTable.title,
          authors: booksTable.authors,
          image: booksTable.cover_url,
          page_count: booksTable.page_count,
        },
      })
      .from(libraryBooksTable)
      .innerJoin(booksTable, eq(libraryBooksTable.book_id, booksTable.id));
    // .limit(20)
    [{ total }] = await db.select({ total: count() }).from(booksTable);
  } catch (error) {
    console.error(error);
    return <p className="text-destructive italic">Error loading books.</p>;
  }
  return (
    <>
      <span className="italic text-foreground/50">
        Books owned: {total}
      </span>
      <BookListClient books={books} />
    </>
  );
};

export default BookList;
