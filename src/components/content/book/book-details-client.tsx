"use client";
import EditBookButton from "@/components/avatar/buttons/edit-book-button";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookType } from "@/schemas";
import { InfoIcon } from "lucide-react";
import React from "react";
import Book from "./book-details";

const BookDetailsClient = ({ book }: { book: BookType }) => {
  // FIX: add the library tag in the book info (and an option to change, and add the library)
  return (
    <Book bookInfo={book}>
      <div className="flex flex-col md:flex-row gap-10 items-stretch">
        <div className="md:basis-1/3 flex justify-center items-start">
          <div className="h-full w-fit">
            <Book.Image className="w-auto h-96 object-contain rounded-2xl" />
          </div>
        </div>

        <div className="md:basis-2/3 h-fit md:h-screen max-h-96 flex flex-col justify-between items-start">
          <div className="w-full">
            <Book.Title />
            <Book.Subtitle />
            <Book.Authors />
            <Book.Categories />
          </div>

          <div className="relative rounded-2xl px-4 py-3 bg-[#848A95] w-full md:w-fit">
            <div className="absolute top-3 right-4 cursor-pointer">
              <EditBookButton book={book} />
            </div>
            <Dialog>
              <h1 className="inline-flex text-white items-center gap-3 text-lg md:text-xl font-semibold">
                Book
                <DialogTrigger className="cursor-pointer">
                  <InfoIcon className="size-[18px] md:size-[20px]" />
                </DialogTrigger>
              </h1>
              <DialogContent className="max-w-xl">
                <DialogHeader className="flex flex-row w-full items-start justify-start h-14">
                  <Book.Image className="w-auto h-full object-contain rounded-xs"
 />
                  <div className="flex flex-col">
                    <DialogTitle className="text-[1.3rem]">
                      Edition Details
                    </DialogTitle>
                    <p className="leading-3">Book</p>
                  </div>
                </DialogHeader>
                <div className="w-full h-[1px] bg-foreground/10"></div>
                <div className="text-sm">
                  <h1 className="text-md font-semibold">
                    Publisher Description
                  </h1>
                  <p>{book.description?.slice(0, 150) ?? "No description"}</p>
                  <div className="my-5 w-full h-[1px] bg-foreground/10"></div>
                </div>
                <div className="flex flex-col justify-center items-start gap-5">
                  <Book.Rating rating="4.7" />
                  <Book.Released />
                  <Book.Language />
                  <Book.Length />
                  <Book.Publisher />
                </div>
              </DialogContent>
            </Dialog>
            <p className="text-sm pb-4 text-white">
              {book.page_count ?? 0} Pages
            </p>

            <div className="flex flex-row gap-3">
              <Button
                size={"lg"}
                className="flex-1/2 bg-[#9DA2AE] hover:bg-[#8C919B] hover:text-[#C4C8D1] text-md font-semibold transition-colors duration-300 ease-in-out cursor-pointer rounded-lg"
              >
                Start Reading
              </Button>
              <Button
                size={"lg"}
                asChild
                className="flex-1/2 bg-white hover:bg-[#B3B5BC] hover:text-[#73757B] text-foreground text-md font-normal transition-colors duration-300 ease-in-out cursor-pointer rounded-lg"
              >
                <a
                  href={`https://www.google.com/search?q=${book.title.replaceAll(" ", "+")}&oq=${book.title.replaceAll(" ", "+")}`}
                  target="_blank"
                >
                  Find Online
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-20 w-full max-w-5xl justify-self-center pb-20">
        <h1 className="text-xl font-semibold pb-2">About the book:</h1>
        <p className="italic leading-relaxed tracking-normal text-justify">
          {book.description ?? "Not Specified"}
        </p>
      </div>
    </Book>
  );
};

export default BookDetailsClient;
