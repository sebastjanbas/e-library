import { withUserTransaction } from "@/actions/book-db";
import BookDetailsClient from "./book-details-client";
import { booksTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function BookServerDetails({ bookId }: { bookId: string }) {
  const book = await withUserTransaction((tx) =>
    tx.select().from(booksTable).where(eq(booksTable.id, bookId))
  );

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
