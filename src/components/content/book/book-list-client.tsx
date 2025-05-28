"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { badgeStatus } from "@/lib/docs";
import { EllipsisVertical } from "lucide-react";
import { BookImageBackground } from "./book-image-background";
import { useRouter } from "next/navigation";

type BookListProps = {
  books: {
    reading_status: "not_started" | "reading" | "finished" | null;
    book: {
      id: string;
      title: string;
      authors: string[] | null;
      image: string | null;
    };
  }[];
};

const BookListClient = ({ books }: BookListProps) => {
  const router = useRouter();
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

  return (
    <ul className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
      {books.map((book, i) => (
        <li
          key={i}
          onClick={() => router.push(`/book-info/${book.book.id}`)}
          className="bg-background rounded-2xl p-4 flex flex-col sm:flex-row gap-y-2 justify-between cursor-pointer"
          style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
        >
          <div className="flex flex-row gap-3 items-start">
            <div className="w-[90px]">
              <BookImageBackground
                image={book.book.image}
                title={book.book.title}
              />
            </div>
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
          <div className="flex flex-row justify-between items-center gap-5">
            <Badge className="w-[85px] h-fit flex" variant={book.reading_status}>
              {badgeStatus[book.reading_status ?? "not_started"]}
            </Badge>
            <span className="cursor-pointer">
              <EllipsisVertical />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookListClient;
