"use server";
import { z } from "zod";
import { BookSchema, LibraryType } from "@/schemas";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { booksTable } from "@/db/schema";
import { setUserSession } from "./book-db";
import { createClient } from "@/utils/supabase/server";
import { sql } from "drizzle-orm";

export const saveBook = async (
  values: z.infer<typeof BookSchema>,
  library: string,
) => {
  const {userId} = await auth()
  
  console.log(library);
  

  if (!userId) {
    return { error: "User not authenticated!" };
  }

  const user_id = await setUserSession()

  // // 1. Find all books with same ISBN and same user
  // const { data: existingBooks, error: bookLookupError } = await supabase
  //   .from("books")
  //   .select("id")
  //   .or(`isbn_13.eq.${values.isbn13},isbn_10.eq.${values.isbn10}`)
  //   .eq("user_id", user?.id);

  // if (bookLookupError) {
  //   return { error: "Error checking for existing book." };
  // }

  // // 2. If any book exists, check if any of them are already linked to the given library
  // if (existingBooks && existingBooks.length > 0) {
  //   const existingBookIds = existingBooks.map((book) => book.id);

  //   const { data: existingLinks, error: linkError } = await supabase
  //     .from("library_books")
  //     .select("id")
  //     .in("book_id", existingBookIds)
  //     .eq("library_id", library);

  //   if (linkError) {
  //     return { error: "Error checking if book already exists in library." };
  //   

  //   if (existingLinks && existingLinks.length > 0) {
  //     return { error: "This book already exists in the selected library." };
  //   }
  // }

  if (values.thumbnailUrl) {
    values.thumbnailUrl = `https://images-na.ssl-images-amazon.com/images/P/${values.isbn10}.01._SX360_SCLZZZZZZZ_.jpg`;
  }

  const bookInfo = {
    user_id: user_id,
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

   const bookResponse = await db.transaction(async (tx) => {
    await tx.execute(
      sql.raw(`SET app.current_user_id = '${user_id}'`)
    );

    return await tx.insert(booksTable).values(bookInfo);
  });
  
  if (bookResponse.rowCount !== 1) {
    return { error: "Failed to save book." };
  }

  // const libraryResponse = await db.insert(librariesTable).values({
  //   library_id: library,
  //   book_id: bookData.id,
  //   reading_status: "not_started",
  // })
  // console.log("Library response: ", libraryResponse)

  // if (libraryError) {
  //   return { error: "Something went wrong!" + libraryError.message };
  // }


  return { success: "Successfully saved!" };
};

export const updateBookInfo = async (
  values: z.infer<typeof BookSchema>,
  id: string,
) => {
  const supabase = await createClient();

  const updatedData = {
    title: values.title ?? "",
    subtitle: values.subtitle ?? "",
    authors: values.authors ?? [""],
    publisher: values.publisher ?? "",
    published_date: values.publishedDate ?? null,
    isbn_10: values.isbn10 ?? "",
    isbn_13: values.isbn13 ?? "",
    page_count: values.pageCount ?? 0,
    cover_url: values.thumbnailUrl ?? null,
    description: values.description ?? null,
    categories: values.categories ?? null,
    language: values.language ?? null,
    info_link: values.infoUrl ?? null,
  };

  const { error } = await supabase
    .from("books")
    .update(updatedData)
    .eq("id", id);

  if (error) {
    return { error: "Something went wrong: " + error.message };
  }
  return { success: "Book updated successfully!" };
};

export const removeBook = async (id: string) => {
  const supabase = await createClient();
  const response = await supabase.from("books").delete().eq("id", id);

  if (response.status !== 204) {
    return { error: "Something went wrong: " + response.statusText };
  } else {
    return { success: "Book successfully deleted!" };
  }
};

export const createLibrary = async (values: z.infer<typeof LibraryType>) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const libraryData = {
    user_id: user?.id,
    name: values.name,
    description: values.description,
  };
  const { error } = await supabase.from("libraries").insert(libraryData);

  if (error) {
    return { error: "Error creating a library: " + error.message };
  }
  return { success: "Library created successfully!" };
};

export const updateReadingStatus = async (status: string, id: string) => {
  const supabase = await createClient();
  const { error } = await supabase
    .from("library_books")
    .update({ reading_status: status })
    .eq("book_id", id);
  console.log(error)
  if (error) {
    return { error: "Error updating reading status" };
  }
  return;
};
