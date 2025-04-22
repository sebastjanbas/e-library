import { createClient } from "@/utils/supabase/server";
import BookDetailsClient from "./book-details-client";

export async function BookServerDetails({ bookId }: { bookId: string }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  if (error) return <p>Error loading book.</p>;

  return <BookDetailsClient book={data} />;
}
