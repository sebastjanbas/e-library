import { getDb } from "@/db";
import { booksTable, libraryBooksTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import React from "react";
import { formatTitleForPlaceholder } from "../protected/user/dashboard/book-list";
import { Badge } from "@/components/ui/badge";
import { badgeStatus } from "@/lib/docs";
import { EllipsisVertical } from "lucide-react";
import { BookImageBackground } from "./book-image-background";

const BookList = async () => {
  const db = await getDb();
  // const wait = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms))
  let books;
  try {
    // await wait(5000)
    books = await db
      .select({
        reading_status: libraryBooksTable.reading_status,
        notes: libraryBooksTable.notes,
        book: {
          id: booksTable.id,
          title: booksTable.title,
          authors: booksTable.authors,
          image: booksTable.cover_url,
        },
      })
      .from(libraryBooksTable)
      .innerJoin(booksTable, eq(libraryBooksTable.book_id, booksTable.id))
      .limit(20);
  } catch (error) {
    console.error(error);
    return <p className="text-destructive italic">Error loading books.</p>;
  }
  return (
    <div>
      <ul className="flex flex-col gap-5">
        {books.map((book, i) => (
          <li
            key={i}
            className="bg-background rounded-2xl p-4 flex flex-row justify-between"
            style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="flex flex-row gap-3">
              <div className="bg-gradient-to-b from-black to-gray-400 h-[85px] w-[85px] rounded-md relative overflow-hidden shadow-xl">
                {" "}
                <Image
                  src={
                    book.book.image === "" || book.book.image === null
                      ? `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(
                          book.book.title,
                        )}&font=playfair-display&fontsize=24`
                      : book.book.image
                  }
                  alt={book.book.title}
                  height={1920}
                  width={1080}
                  className="h-[80px] w-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[8px] rounded-xs"
                />
              </div>

              <BookImageBackground book={book} />
              <div className="flex flex-col">
                <h3 className="text-xl font-medium tracking-wide">
                  {book.book.title}
                </h3>
                <h4 className="text-foreground/60 italic">
                  {book.book.authors?.join(", ")}
                </h4>
                <span className="text-xl">50%</span>
              </div>
            </div>
            <div className="flex flex-row items-center gap-5">
              <Badge className="w-fit h-fit flex" variant={book.reading_status}>
                {badgeStatus[book.reading_status ?? "not_started"]}
              </Badge>
              <span className="cursor-pointer">
                <EllipsisVertical />
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
