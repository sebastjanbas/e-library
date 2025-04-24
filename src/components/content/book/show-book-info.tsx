/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { saveBook } from "@/actions/book-actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Book from "./book-details";
import LibraryForm from "@/components/hooks/forms/library-form";

type LibraryType = {
  id: string;
  name: string;
  user_id: string;
  description: string;
  created_at: string;
};

const ShowBookInfo = ({ book }: any) => {
  const [library, setLibrary] = useState<string>("")
  const [open, setOpen] = useState(false);
  const [libraries, setLibraries] = useState<LibraryType[] | null>(null);
  const [enableSelect, setEnableSelect] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchLibraries = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from("libraries").select("*");

      if (error) {
        toast.error("Something went wrong: " + error.message);
        return;
      }

      setLibraries(data);
      if (data.length !== 0) {
        setEnableSelect(true);
      }
    };

    fetchLibraries();
  }, [count]);

  const submitBookInfo = async () => {

    if (library === ""){
      toast.error("Must specify the library the book belongs to")
      return
    }

    const {
      title,
      subtitle,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      language,
      infoLink,
      imageLinks,
      industryIdentifiers,
    } = book;

    const thumbnailUrl = imageLinks?.thumbnail;
    const isbn13 =
      industryIdentifiers?.[0]?.type == "ISBN_13"
        ? industryIdentifiers?.[0]?.identifier
        : industryIdentifiers?.[1].identifier;
    const isbn10 =
      industryIdentifiers?.[0]?.type == "ISBN_10"
        ? industryIdentifiers?.[0]?.identifier
        : industryIdentifiers?.[1].identifier;

    const BookInfo = {
      title,
      subtitle,
      authors,
      publisher,
      publishedDate,
      description,
      pageCount,
      categories,
      language,
      infoUrl: infoLink,
      thumbnailUrl,
      isbn13,
      isbn10,
    };

    const response = await saveBook(BookInfo, library);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
      redirect("/");
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <Book bookInfo={book}>
        <div className="flex flex-col md:flex-row">
          <div className="flex md:basis-1/3 justify-center items-center">
            <Book.Image
              imageLink={book.imageLinks?.thumbnail}
              className="w-auto h-96 object-contain rounded-2xl"
            />
          </div>
          <div className="flex flex-col md:basis-2/3 h-fit md:h-screen md:max-h-96">
            <Book.Title />
            <Book.Subtitle />
            <Book.Authors />
            <Book.Categories />
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-5 pb-10">
              <Book.Released date={book.publishedDate} />
              <Book.Language />
              <Book.Length pages={book.pageCount} />
              <Book.Publisher />
            </div>
            <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-3 md:gap-10">
              <div>
                <div className="flex gap-3">
                  <Select value={library} onValueChange={(val) => setLibrary(val)}>
                    <SelectTrigger
                      disabled={!enableSelect}
                      className="w-[180px] disabled:cursor-default"
                    >
                      <SelectValue placeholder="Libraries" />
                    </SelectTrigger>
                    <SelectContent>
                      {libraries &&
                        libraries.map((lib, i: number) => (
                          <SelectItem key={i} value={lib?.id}>
                            {lib?.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>+</DialogTrigger>
                    <DialogContent className="w-full max-w-xl">
                      <DialogHeader>
                        <DialogTitle>Create a new Library</DialogTitle>
                        <DialogDescription></DialogDescription>
                      </DialogHeader>
                      <LibraryForm
                        onSuccess={() => {
                          setOpen(false);
                          setCount(count + 1);
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
                {!enableSelect && (
                  <p className="text-sm italic text-foreground/50">
                    You dont have any libraries yet
                  </p>
                )}
              </div>
              <Button className="md:hover:scale-105" onClick={submitBookInfo}>
                Add Book to Library
              </Button>
            </div>
          </div>
        </div>
        <div className="my-5 w-full h-[1px] bg-foreground/10"></div>
        <Book.Description2 />
      </Book>
    </div>
  );
};

export default ShowBookInfo;
