import React from "react";
import { BookList } from "../protected/user/dashboard/book-list";
import { BookCategories } from "@/lib/docs";
// import { toast } from "sonner";
import { booksTable } from "@/db/schema";
import { getDb } from "@/db";

const BookDashboardList = async () => {
  // const {
  //   data: allBooks,
  //   count,
  //   error,
  // } = await supabase
  //   .from("books")
  //   .select("id, title, description, categories, cover_url", {
  //     count: "exact",
  //   });

  // if (error) {
  //   toast.error("Error loading books!");
  // }

  const db = await getDb();
  const books = await db
    .select({
      id: booksTable.id,
      title: booksTable.title,
      description: booksTable.description,
      categories: booksTable.categories,
      cover_url: booksTable.cover_url,
    })
    .from(booksTable);

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
