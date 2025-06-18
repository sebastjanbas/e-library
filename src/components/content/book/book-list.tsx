// import { getDb } from "@/db";
// import { booksTable } from "@/db/schema";
// import { count } from "drizzle-orm";
import React from "react";
import BookListClient from "./book-list-client";

const BookList = async () => {
  // const db = await getDb();
  // // const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))
  // let total = 0;
  // try {
  //   // await wait(5000)
  //   [{ total }] = await db.select({ total: count() }).from(booksTable);
  // } catch (error) {
  //   console.error(error);
  //   return <p className="text-destructive italic">Error loading books.</p>;
  // }
  return (
    <>
      <BookListClient />
    </>
  );
};

export default BookList;
  // const [searchQuery, setSearchQuery] = useState("");
  //
  // const booksForSearch = books
  //   ?.sort((a: any, b: any) => a.book.title.localeCompare(b.book.title))
  //   .map((item: any) => ({
  //     ...item.book,
  //     reading_status: item.reading_status,
  //   }));
  //
  // const fuse = new Fuse(booksForSearch ?? [], {
  //   keys: ["title", "authors"],
  //   threshold: 0.3,
  // });
  //
  // const filteredBooks = searchQuery.trim()
  //   ? fuse.search(searchQuery).map((res) => res.item)
  //   : (booksForSearch ?? []);
