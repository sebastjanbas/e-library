/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { badgeStatus, ReadingStatus } from "@/lib/docs";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const colors = {
  not_started: "bg-red-400",
  reading: "bg-orange-400",
  finished: "bg-emerald-400",
} as const;

const LibraryInfoTable = ({ libraryBooks }: any) => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const booksForSearch = libraryBooks
    ?.sort((a: any, b: any) => a.book.title.localeCompare(b.book.title))
    .map((item: any) => ({
      ...item.book,
      reading_status: item.reading_status,
    }));

  const fuse = new Fuse(booksForSearch ?? [], {
    keys: ["title", "authors"],
    threshold: 0.3,
  });

  const filteredBooks = searchQuery.trim()
    ? fuse.search(searchQuery).map((res) => res.item)
    : (booksForSearch ?? []);

  return (
    <>
      <div className="relative w-full md:max-w-sm mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search for a book..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              router.push(`/book-info/${filteredBooks[0].id}`);
            }
          }}
          className="pl-10 pr-10"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <Table>
        <TableCaption>
          {filteredBooks && filteredBooks?.length > 0 ? (
            <span>{filteredBooks.length} Book found</span>
          ) : (
            <span>No books found</span>
          )}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Number</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Year</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBooks.map((book: any, i: number) => (
            <TableRow
              key={i}
              className="cursor-pointer hover:bg-muted transition-colors"
              onClick={() => router.push(`/book-info/${book.id}`)}
            >
              <TableCell className="font-medium">{i + 1}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell className="overflow-x-scroll max-w-[300px] xl:max-w-[500px]">
                {book.authors?.join(", ")}
              </TableCell>
              <TableCell
                className={`text-white font-bold text-center rounded-sm ${colors[book.reading_status as ReadingStatus] ?? ""}`}
              >
                {badgeStatus[book.reading_status as ReadingStatus] ?? "Error"}
              </TableCell>
              <TableCell className="text-right">
                {book.published_date.slice(0, 4)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LibraryInfoTable;
