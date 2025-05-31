/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import EditBookButton from "@/components/avatar/buttons/edit-book-button";
import React, { useState } from "react";
import Book from "./book-details";
import { BookType } from "@/schemas";
import { formatDate, languageMap, ReadingStatus } from "@/lib/docs";
import { Button } from "@/components/ui/button";
import { updateReadingStatus } from "@/actions/book-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BookImageBackground } from "./book-image-background";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building, CalendarDays, InfoIcon, Ruler } from "lucide-react";
import { BsStarFill } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";

type BookDetailsProps = {
  book: BookType;
  libraries?: any;
};

const BookDetailsClient = ({ book, libraries }: BookDetailsProps) => {
  // FIX: the library situation (and an option to change, and add the library)
  const status = libraries
    ? (libraries[0].reading_status as ReadingStatus)
    : "not_started";
  const router = useRouter();
  const readingS = [
    { status: "not_started", value: "Start Reading" },
    { status: "reading", value: "Finished" },
    { status: "finished", value: "Reset" },
  ];
  const idx = readingS.findIndex((item) => item.status === status);
  const [index, setIndex] = useState(idx);
  const [reading, setReading] = useState<string>(readingS[idx].value);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (status: string) => {
    setLoading(true);

    const response = await updateReadingStatus(status, book.id);
    if (response?.error) {
      toast.error(response.error);
    }
    router.refresh();
    setLoading(false);
  };

  return (
    <Book bookInfo={book} className="relative">
      <div className="flex flex-col md:flex-row items-center gap-10">
        <div className="flex md:basis-1/4 justify-center items-start">
          <BookImageBackground
            variant="bookDetails"
            image={book?.cover_url ?? null}
            title={book.title}
          />
        </div>
        <div className="flex flex-col md:basis-2/3">
          <Book.Title />
          <Book.Subtitle />
          <Book.Authors />
          <Book.Categories />
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
                  <Image
                    width={400}
                    height={600}
                    src={
                      book.cover_url ??
                      "https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
                    }
                    alt={book.title}
                    className="w-auto h-full object-contain rounded-xs"
                  />

                  <div className="flex flex-col">
                    <DialogTitle className="text-[1.3rem]">
                      Edition Details
                    </DialogTitle>

                    <p className="leading-3">Book</p>
                  </div>
                </DialogHeader>

                <div className="w-full h-[1px] bg-foreground/10"></div>

                  <Book.Description2 />
                  <div className="w-full h-[1px] bg-foreground/10"></div>

                <div className="flex flex-col justify-center items-start gap-5">
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-lg font-semibold tracking-tighter w-8">
                      4.7
                    </span>

                    <div className="flex flex-col gap-0">
                      <h2 className="text-sm text-gray-600">Book Rating</h2>

                      <span className="inline-flex gap-1">
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                        <BsStarFill />
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <CalendarDays className="w-8" />

                    <div className="flex flex-col gap-0">
                      <h2 className="text-sm text-gray-600">Released</h2>

                      <p className="font-semibold leading-4">
                        {book.published_date
                          ? formatDate(book?.published_date)
                          : "Unkown"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <IoIosGlobe size={27} className="w-8" />

                    <div className="flex flex-col gap-0">
                      <h2 className="text-sm text-gray-600">Language</h2>

                      <p className="font-semibold leading-4">
                        {book.language
                          ? languageMap[book.language]
                          : book.language}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <Ruler className="rotate-[-45deg] w-8" />

                    <div className="flex flex-col gap-0">
                      <h2 className="text-sm text-gray-600">Length</h2>

                      <p className="font-semibold leading-4">
                        {book.page_count ?? 0}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-row gap-3 items-center">
                    <Building className="w-8" />

                    <div className="flex flex-col gap-0">
                      <h2 className="text-sm text-gray-600">Publisher</h2>

                      <p className="font-semibold leading-4">
                        {book.publisher ?? "Unknown"}
                      </p>
                    </div>
                  </div>
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

      <div className="my-5 w-full h-[1px] bg-foreground/10"></div>

      <p>Current page: {libraries[0].current_page ?? "error"}</p>
      <p>Reading status: {libraries[0].reading_status ?? "error"}</p>
      <div className="w-full flex flex-col md:flex-row justify-between md:pr-16 items-start md:items-center gap-3 md:gap-10">
        <Button
          disabled={loading}
          onClick={() => {
            updateStatus(readingS[(index + 1) % 3].status);
            setReading(readingS[(index + 1) % 3].value);
            setIndex((index + 1) % 3);
          }}
          className="py-5 px-4 bg-background hover:bg-foreground/5 rounded-lg text-foreground text-md font-semibold border-[1px] border-foreground/20"
        >
          {reading}
        </Button>
        <div>
          {libraries.length > 0 ? (
            libraries.map(
              (lib: { library: { id: string; name: string } }, i: number) => (
                <Button
                  onClick={() => {
                    router.push(`/rooms/${lib.library.id}`);
                  }}
                  className="py-5 px-4 bg-background hover:bg-foreground/5 rounded-lg text-foreground text-md font-semibold border-[1px] border-foreground/20"
                  key={i}
                >
                  {lib.library.name}
                </Button>
              ),
            )
          ) : (
            <p className="text-destructive italic">
              Book not linked to library
            </p>
          )}
        </div>
      </div>
    </Book>
  );
};

export default BookDetailsClient;
