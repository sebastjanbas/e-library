"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { badgeStatus } from "@/lib/docs";
import { EllipsisVertical } from "lucide-react";
import { BookImageBackground } from "./book-image-background";
import { useRouter } from "next/navigation";

type Book = {
    current_page: string | null;
    reading_status: "not_started" | "reading" | "finished" | null;
    book: {
      id: string;
      title: string;
      authors: string[] | null;
      image: string | null;
      page_count: number | null;
    };
  }[];

const BookListClient = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book>([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  const loadBooks = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);
    const res = await fetch(`/api/load-books?offset=${offset}&limit=20`);
    const data = await res.json();

    setBooks((prev) => [...prev, ...data.books]);

    const newOffset = offset + data.books.length;
    setOffset(newOffset);

    if (newOffset >= data.total) {
      setAllLoaded(true);
    }

    setLoading(false);
  }, [offset, loading, allLoaded]);

  // useEffect(() => {
  //   loadBooks();
  // }, []);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (allLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadBooks();
        }
      },
      { threshold: 1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadBooks, allLoaded]);

  return (
    <>
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
                <span
                  className={`${parseInt(book.current_page ?? "0") < 1 ? "hidden" : ""} font-medium text-lg`}
                >
                  {book.current_page &&
                    book.book.page_count &&
                    Math.round(
                      (parseInt(book.current_page) / book.book.page_count) *
                      100,
                    )}
                  % <span className="text-sm text-foreground/50">finished</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-5">
              <Badge
                className="w-[85px] h-fit flex"
                variant={book.reading_status}
              >
                {badgeStatus[book.reading_status ?? "not_started"]}
              </Badge>
              <span className="cursor-pointer">
                <EllipsisVertical />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={observerRef} className="h-10" />

      {loading && <p className="text-center">Loading...</p>}
      {allLoaded && (
        <p className="text-center text-muted-foreground">All books loaded</p>
      )}
    </>
  );
};

export default BookListClient;
