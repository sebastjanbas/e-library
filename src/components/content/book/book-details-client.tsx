/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EditBookButton from "@/components/avatar/buttons/edit-book-button";
import React from "react";
import Book from "./book-details";
import { Badge } from "@/components/ui/badge";
import { BookType } from "@/schemas";
import { FaStar } from "react-icons/fa6";

type BookDetailsProps = {
  book: BookType;
  libraries: any;
};

const BookDetailsClient = ({ book, libraries }: BookDetailsProps) => {
  // FIX: the library situation (and an option to change, and add the library)
  const badgeStatus = {
    not_started: "Not Started",
    reading: "Reading",
    finished: "Finished",
  } as const;
  type ReadingStatus = keyof typeof badgeStatus;
  const status = libraries[0].reading_status as ReadingStatus;

  return (
    <Book bookInfo={book} className="relative">
      <div className="absolute top-[6px] right-10 w-fit h-fit">
        <EditBookButton book={book} />
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex md:basis-1/3 justify-center items-center">
          <Book.Image className="w-auto h-96 object-contain rounded-2xl" />
        </div>
        <div className="flex flex-col md:basis-2/3 h-fit md:h-screen md:max-h-96">
          <Book.Title className="w-fit flex self-center md:self-start">
            <div className="md:inline-block -translate-y-1">
              <div className="flex flex-row items-center gap-2">
              <Badge
                className="w-fit h-fit flex"
                variant={status}
              >
                {badgeStatus[status]}
              </Badge>
              <Badge
                className="w-fit h-[23px] flex self-center"
                variant={"favorite"}
              >
                <FaStar />
              </Badge>
              </div>
            </div>
          </Book.Title>

          <Book.Subtitle />
          <Book.Authors />
          <Book.Categories />
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-2 gap-y-5 pb-10">
            <Book.Released />
            <Book.Language />
            <Book.Length />
            <Book.Publisher />
          </div>
          <div className="w-full flex flex-col md:flex-row justify-start items-start md:items-center gap-3 md:gap-10">
            <div>
              {libraries.length > 0 ? (
                libraries.map(
                  (lib: { library: { name: string } }, i: number) => (
                    <p
                      className="font-semibold py-2 px-4 border-[1px] border-foreground/20 w-fit rounded-lg"
                      key={i}
                    >
                      {lib.library.name}
                    </p>
                  ),
                )
              ) : (
                <p className="text-destructive italic">
                  Book not linked to library
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 w-full h-[1px] bg-foreground/10"></div>
      <Book.Description2 />
    </Book>
  );
};

export default BookDetailsClient;
