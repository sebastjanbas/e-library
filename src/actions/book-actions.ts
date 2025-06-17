"use server";
import { z } from "zod";
import { BookSchema, LibraryType } from "@/schemas";
import { getDb } from "@/db";
import { booksTable, librariesTable, libraryBooksTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq, inArray, or } from "drizzle-orm";

export const saveBook = async (
  values: z.infer<typeof BookSchema>,
  library: string,
) => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated!" };
  }
  const db = await getDb();

  // 1. Find existing books with matching ISBN and same user
  let existingBooks = [];
  try {
    existingBooks = await db
      .select({ id: booksTable.id })
      .from(booksTable)
      .where(
        and(
          or(
            eq(booksTable.isbn_13, values.isbn13),
            eq(booksTable.isbn_10, values.isbn10),
          ),
          eq(booksTable.user_id, userId),
        ),
      );
  } catch (error) {
    return {
      error:
        "Error checking for existing book: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }

  // 2. Check if any are already linked to the given library
  if (existingBooks.length > 0) {
    const existingBookIds = existingBooks.map((book) => book.id);

    try {
      const existingLinks = await db
        .select({ id: libraryBooksTable.id })
        .from(libraryBooksTable)
        .where(
          and(
            inArray(libraryBooksTable.book_id, existingBookIds),
            eq(libraryBooksTable.library_id, library),
          ),
        );

      if (existingLinks.length > 0) {
        return { error: "This book already exists in the selected library." };
      }
    } catch (error) {
      return {
        error:
          "Error checking if book already exists in library: " +
          (error instanceof Error ? error.message : String(error)),
      };
    }
  }

  // 3. Insert new book
  if (values.thumbnailUrl) {
    values.thumbnailUrl = `https://images-na.ssl-images-amazon.com/images/P/${values.isbn10}.01._SX360_SCLZZZZZZZ_.jpg`;
  }

  const bookInfo = {
    user_id: userId,
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

  let insertedBook;
  try {
    const result = await db
      .insert(booksTable)
      .values(bookInfo)
      .returning({ id: booksTable.id });
    insertedBook = result[0];
  } catch (error) {
    return {
      error:
        "Failed to save book: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }

  // 4. Link to library
  try {
    await db.insert(libraryBooksTable).values({
      library_id: library,
      book_id: insertedBook.id,
      reading_status: "not_started",
    });
  } catch (error) {
    return {
      error:
        "Error linking book to library: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }

  return { success: "Successfully saved!" };
};

export const updateBookInfo = async (
  values: z.infer<typeof BookSchema>,
  id: string,
) => {
  const db = await getDb();
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

  try {
    await db.update(booksTable).set(updatedData).where(eq(booksTable.id, id));

    return { success: "Book updated successfully!" };
  } catch (error) {
    return {
      error:
        "Something went wrong: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};

export const removeBook = async (id: string) => {
  const db = await getDb();
  try {
    await db.delete(booksTable).where(eq(booksTable.id, id));

    return { success: "Book successfully deleted!" };
  } catch (error) {
    return {
      error:
        "Something went wrong: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};

export const updateReadingStatus = async (status: string, id: string) => {
  const db = await getDb();
  try {
    await db
      .update(libraryBooksTable)
      .set({ reading_status: status as "not_started" | "reading" | "finished" })
      .where(eq(libraryBooksTable.book_id, id));
  } catch (error) {
    console.error(error);
    return { error: "Error updating reading status" };
  }
};

export const updateCurrentPage = async (newPage: number, id: string) => {
  const db = await getDb();
  try {
    await db
      .update(libraryBooksTable)
      .set({ current_page: newPage.toString() })
      .where(eq(libraryBooksTable.id, id));
  } catch (error) {
    console.error(error);
    return { error: "Error updating page number" };
  }
  return { success: "Successfully updated page number" };
};

export const createLibrary = async (values: z.infer<typeof LibraryType>) => {
  const { userId } = await auth();
  if (!userId) {
    return { error: "User not authenticated!" };
  }

  const db = await getDb();

  const libraryData = {
    user_id: userId,
    name: values.name,
    description: values.description,
  };

  try {
    await db.insert(librariesTable).values(libraryData);
    return { success: "Library created successfully!" };
  } catch (error) {
    return {
      error:
        "Error creating a library: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};

export const deleteLibray = async (libraryId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { error: "User not authenticated!" };
  }

  console.log("Delete triggered");

  const db = await getDb();

  try {
    const booksToDelete = await db
      .select({
        id: libraryBooksTable.book_id,
      })
      .from(libraryBooksTable)
      .where(eq(libraryBooksTable.library_id, libraryId));

    booksToDelete.map(async (book) => {
      // console.log("Deleting: ", book.id);
      await db.delete(booksTable).where(eq(booksTable.id, book.id));
    });
    // console.log("BOOKS SUCCESFULLY DELETED!");
    await db.delete(librariesTable).where(eq(librariesTable.id, libraryId));
    // console.log("SUCCESS!");
    return {success: "Library and it's contents have been deleted successfully"}
  } catch (error) {
    return {
      error:
        "Error deleting the library: " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};
