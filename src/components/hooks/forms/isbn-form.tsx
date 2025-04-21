/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import ShowBookInfo from "@/components/content/book/show-book-info";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";
import BookDetailsForm from "./book-details-form";

const ISBNForm = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const fetchBookData = async () => {
    if (!isbn) {
      toast.error("Please enter an ISBN");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`,
      );
      const data = await response.json();

      if (data?.items) {
        setBook(data.items[0].volumeInfo);
        toast.success("Book found!");
      } else {
        toast.error("Could not find the book!");
      }
    } catch (error) {
      toast.error("Error fetching book data.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (book) {
    return (
      <>
        <ShowBookInfo book={book} />
      </>
    );
  }

  return (
    <>
      <div className="border-black border-[1px] p-5 h-full w-full md:w-fit">
        <div
          className={`overflow-hidden w-full transition-all duration-1000 ease-in-out p-5 ${expanded
              ? "max-h-[3000px] max-w-[1000px]"
              : "max-h-28 w-full md:max-w-52"
            }`}
        >
          <Button
            onClick={() => setExpanded(!expanded)}
            variant={"link"}
            className={`w-full ${expanded ? "h-fit mb-5 justify-end translate-y-0" : "h-full mb-20 justify-center translate-y-5"} flex items-center`}
          >
            show form
          </Button>

          <BookDetailsForm />
        </div>
      </div>
      <div className="border-black h-fit w-full md:w-fit border-[1px] p-5 space-y-3">
        <div className="space-y-4">
          <p className="text-sm font-medium">Search by ISBN</p>
          <Input
            placeholder="ISBN number"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
          <Button
            type="button"
            onClick={fetchBookData}
            disabled={isLoading}
            className="w-full rounded-full"
          >
            {isLoading ? "Searching..." : "Search for the book"}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ISBNForm;
