import React from "react";
import { BookList } from "../protected/user/dashboard/book-list";
import { BookCategories } from "@/lib/docs";
import { createClient } from "@/utils/supabase/server";
import { toast } from "sonner";

const BookDashboardList = async () => {
  const supabase = await createClient();
  const {
    data: allBooks,
    count,
    error,
  } = await supabase
    .from("books")
    .select("id, title, description, categories, cover_url", {
      count: "exact",
    });

  if (error) {
    toast.error("Error loading books!");
  }
  if (count === 0) return <p>Add your first book to see statistics</p>;

  return (
    <>
      <div>
        <p>ALL</p>
        <BookList list={allBooks} />
      </div>
      {BookCategories.filter((category) =>
        allBooks?.some((book) =>
          book.categories?.some((cat: string) =>
            cat.toLowerCase().includes(category.toLowerCase()),
          ),
        ),
      ).map((category, i) => (
        <div key={i}>
          <p className="capitalize">{category}</p>
          <BookList
            list={
              allBooks &&
              allBooks.filter((book) =>
                book.categories?.some((cat: string) =>
                  new RegExp(`\\b${category}\\b`, "i").test(cat),
                ),
              )
            }
          />
        </div>
      ))}
    </>
  );
};

export default BookDashboardList;
