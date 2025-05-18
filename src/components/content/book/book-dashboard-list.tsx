import React from "react";
import { BookList } from "../protected/user/dashboard/book-list";
import { BookCategories } from "@/lib/docs";
import { booksTable } from "@/db/schema";
import { getDb } from "@/db";
import { toast } from "sonner";

const BookDashboardList = async () => {
  const db = await getDb();
  let books;
  try {
    books = await db
      .select({
        id: booksTable.id,
        title: booksTable.title,
        description: booksTable.description,
        categories: booksTable.categories,
        cover_url: booksTable.cover_url,
      })
      .from(booksTable);
  } catch (error) {
    toast.error(
      "Error loading books: " +
        (error instanceof Error ? error.message : String(error))
    );
    return <p className="text-destructive italic">Something went wrong</p>;
  }

  if (books.length === 0) return <p>Add your first book to see statistics</p>;

  return (
    <>
      <div>
        <p>ALL</p>
        <BookList list={books} />
      </div>
      {BookCategories.filter((category) =>
        books?.some((book) =>
          book.categories?.some((cat: string) =>
            cat.toLowerCase().includes(category.toLowerCase())
          )
        )
      ).map((category, i) => (
        <div key={i}>
          <p className="capitalize">{category}</p>
          <BookList
            list={
              books &&
              books.filter((book) =>
                book.categories?.some((cat: string) =>
                  new RegExp(`\\b${category}\\b`, "i").test(cat)
                )
              )
            }
          />
        </div>
      ))}
    </>
  );
};

export default BookDashboardList;
