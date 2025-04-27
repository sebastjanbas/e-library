/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const LibraryInfo = async ({ libId }: any) => {
  const supabase = await createClient(); // 1. Get the single library info
  const { data: library, error: libraryError } = await supabase
    .from("libraries")
    .select("name, description")
    .eq("id", libId)
    .single(); // <- get only one library

  // 2. Get all books inside that library
  const { data: libraryBooks, error: booksError } = await supabase
    .from("library_books")
    .select("reading_status, book:books(title, authors, published_date)") // join the books table
    .eq("library_id", libId);

  if (libraryError || booksError) {
    toast.error("Something went wrong!");
  }
  return (
    <>
      <p className="text-8xl">{library?.name}</p>
      <p className="italic pb-10">{library?.description}</p>

      <div className="italic w-full border-b-foreground/10 border-b-[1px] mb-5 text-sm">
        Search :
      </div>
      <Table>
        <TableCaption>
          {libraryBooks && libraryBooks?.length > 0 ? (
            <span>A list of books</span>
          ) : (
            <span>This library is empty</span>
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
          {libraryBooks &&
            libraryBooks.map((book: any, i: number) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{i + 1}</TableCell>
                <TableCell>{book.book.title}</TableCell>
                <TableCell className="overflow-hidden max-w-[300px]">
                  {book.book.authors?.join(", ")}
                </TableCell>
                <TableCell>{book.reading_status}</TableCell>
                <TableCell className="text-right">
                  {book.book.published_date.slice(0, 4)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default LibraryInfo;
