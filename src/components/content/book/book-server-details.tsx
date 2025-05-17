"use server";
import BookDetailsClient from "./book-details-client";
import { booksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";

export async function BookServerDetails({ bookId }: { bookId: string }) {
  const db = await getDb();
  const book = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, bookId))
    .limit(1);

  // const { data: libData, error: libError } = await supabase
  //   .from("library_books")
  //   .select("reading_status, custom_notes, library:libraries(id,name)")
  //   .eq("book_id", bookId);

  if (!book) return <p>Error loading book.</p>;
  // if (libError) return <p>Error loading Library</p>;

  return (
    <>
      <BookDetailsClient book={book[0]} />
      {/* <BookDetailsClient book={book[0]} libraries={libData} /> */}
    </>
  );
}
