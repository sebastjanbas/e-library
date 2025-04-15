/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { toast } from "sonner";

const ISBNForm = () => {
  const [isbn, setIsbn] = useState("");
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    return <div>{JSON.stringify(book)}</div>;
  }

  return (
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
  );
};

export default ISBNForm;
