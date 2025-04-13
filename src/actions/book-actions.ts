"use server";
import { z } from "zod";
import { BookSchema } from "@/schemas";
import { createClient } from "@/utils/supabase/server";

export const saveBook = async (values: z.infer<typeof BookSchema>) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  // 1. Check for existing book with same ISBN
  const { data: existingBooks, error: selectError } = await supabase
    .from("books")
    .select("id")
    .or(`isbn_13.eq.${values.isbn13},isbn_10.eq.${values.isbn10}`)
    .eq("user_id", user?.id) // optional: only check duplicates for the same user
    .limit(1);

  if (selectError) {
    console.error(selectError);
    return { error: "Error checking for existing book." };
  }

  if (existingBooks && existingBooks.length > 0) {
    return { error: "A book with the same ISBN already exists." };
  }

  const bookInfo = {
    user_id: user?.id,
    title: values.title,
    subtitle: values.subtitle,
    authors: values.authors,
    publisher: values.publisher,
    description: values.description,
    published_date: values.publishedDate,
    isbn_10: values.isbn10,
    isbn_13: values.isbn13,
    page_count: values.pageCount,
    cover_url: values.thumbnailUrl,
    categories: values.categories,
    language: values.language,
    info_link: values.infoUrl,
  };

  const { error } = await supabase.from("books").insert(bookInfo);

  if (error || userError) {
    console.log(error);
    return { error: "Something went wrong!" };
  }

  return { success: "Successfully saved!" };
};
