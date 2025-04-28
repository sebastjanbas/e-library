/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { toast } from "sonner";
import LibraryInfoTable from "./library-info-table";

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
    .select("reading_status, book:books(id, title, authors, published_date)") // join the books table
    .eq("library_id", libId);

  if (libraryError || booksError) {
    toast.error("Something went wrong!");
  }

  return (
    <>
      <p className="text-8xl font-semibold pb-2">{library?.name}</p>
      <p className="italic pb-10">{library?.description}</p>
      <LibraryInfoTable libraryBooks={libraryBooks} />
    </>
  );
};

export default LibraryInfo;
