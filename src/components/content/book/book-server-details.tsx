import { createClient } from "@/utils/supabase/server";
import BookDetailsClient from "./book-details-client";

export async function BookServerDetails({ bookId }: { bookId: string }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

const { data: libData, error:libError } = await supabase
  .from("library_books")
  .select("reading_status, custom_notes, library:libraries(id,name)")
  .eq("book_id", bookId)

  if (error) return <p>Error loading book.</p>;
  if (libError) return <p>Error loading Library</p>;

  return <BookDetailsClient book={data} libraries={libData} />;
}
