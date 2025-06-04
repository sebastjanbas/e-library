"use server";
// import BookDetailsClient from "./book-details-client";
import { booksTable, librariesTable, libraryBooksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import BookInfoCard from "./book-info-card";
import BookProgressInfo from "./book-progress-info";

export async function BookServerDetails({ bookId }: { bookId: string }) {
  const db = await getDb();
  let book;
  try {
    book = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, bookId))
      .limit(1);
  } catch (error) {
    console.error(error);
    return <p className="text-destructive italic">Error loading book.</p>;
  }

  let libraries;
  try {
    libraries = await db
      .select({
        reading_status: libraryBooksTable.reading_status,
        current_page: libraryBooksTable.current_page,
        notes: libraryBooksTable.notes,
        library: {
          id: librariesTable.id,
          name: librariesTable.name,
        },
      })
      .from(libraryBooksTable)
      .innerJoin(
        librariesTable,
        eq(libraryBooksTable.library_id, librariesTable.id),
      )
      .where(eq(libraryBooksTable.book_id, bookId));
  } catch (error) {
    console.error(error);
    return <p className="text-destructive italic">Error loading books.</p>;
  }
  return (
    <div className="flex flex-col xl:flex-row justify-center gap-10 2xl:gap-20 items-start">
      {/* <BookDetailsClient book={book[0]} libraries={libraries} /> */}
      <BookInfoCard book={book[0]} />
      <BookProgressInfo totalPages={book[0].page_count ?? 0} readingInfo={libraries[0]} />
    </div>
  );
}
