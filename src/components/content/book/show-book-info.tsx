/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { saveBook } from "@/actions/book-actions";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const ShowBookInfo = ({ book }: any) => {
  const highlightColor = "bg-yellow-300/30";
  const [extended, setExtended] = useState(false);
  const MAX_LENGTH = 150;

  const submitBookInfo = async () => {
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
    const isbn13 = industryIdentifiers?.[0]?.type == "ISBN_13" ? industryIdentifiers?.[0]?.identifier : industryIdentifiers?.[1].identifier;
    const isbn10 = industryIdentifiers?.[0]?.type == "ISBN_10" ? industryIdentifiers?.[0]?.identifier : industryIdentifiers?.[1].identifier;

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

    const response = await saveBook(BookInfo);

    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success(response.success);
      redirect("/");
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start mt-20 h-full w-full max-w-7xl gap-y-6 md:gap-0">
        <div className="flex-1 justify-center items-center">
          {book.imageLinks ? (
            <Image
              className="w-[200px] justify-self-center h-auto object-contain"
              width={400}
              height={600}
              src={book.imageLinks.thumbnail}
              alt={`${book.title} thumbnail`}
            />
          ) : (
            <Image
              className="w-[200px] justify-self-center h-auto object-contain"
              src="https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
              width={400}
              height={600}
              alt="Image thumbnail"
            />
          )}
        </div>
        <div className="flex-1/2">
          <p className="font-bold text-lg">
            Title: {book?.title ?? "No title"}
          </p>
          <p>
            <span className={highlightColor}>Subtitle:</span>{" "}
            {book?.subtitle ?? "No subtitle"}
          </p>
          <p>
            <span className={highlightColor}>Authors:</span>{" "}
            {book?.authors?.join(", ") ?? "Unknown"}
          </p>
          <p>
            <span className={highlightColor}>Publisher:</span>{" "}
            {book.publisher ?? "Unknown"}{" "}
          </p>
          <p>
            <span className={highlightColor}>Published date:</span>{" "}
            {book?.publishedDate ?? "No date"}
          </p>
          <div className="my-3 ">
            {book.description ? (
              <>
                <span className={highlightColor}>Description:</span>{" "}
                <span className="text-sm md:text-[16px]">
                  {extended
                    ? book.description
                    : book?.description.slice(0, MAX_LENGTH) + " ..."}
                </span>
                <Button
                  variant={"link"}
                  className="cursor-pointer"
                  onClick={() => setExtended(!extended)}
                >
                  {extended ? "Read less" : "Read more"}
                </Button>
              </>
            ) : (
              <p>No description</p>
            )}
          </div>
          <p>
            <span className={highlightColor}>Page count:</span>{" "}
            {book?.pageCount === 0 || book?.pageCount == null
              ? "Not available"
              : book.pageCount}
          </p>
          <p>
            <span className={highlightColor}>Type:</span>{" "}
            {book?.printType ?? "Unknown"}
          </p>
          <p>
            <span className={highlightColor}>Categories:</span>{" "}
            {book?.categories?.join(" ,") ?? "Unknown"}
          </p>
          <p>
            <span className={highlightColor}>Language:</span>{" "}
            {book?.language ?? "Unknown"}
          </p>
          <p>
            <span className={highlightColor}>Info link:</span>{" "}
            <a
              href={book?.infoLink ?? "#"}
              target="_blank"
              className="italic underline"
            >
              google books link
            </a>
          </p>
          <Button className="mt-5 md:hover:scale-105" onClick={submitBookInfo}>
            {/* FIX: Add the selection option (or create new) */}
            Add Book to Library
          </Button>
        </div>
      </div>
      {/* <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}> */}
      {/*   {JSON.stringify(book, null, 2)} */}
      {/* </pre> */}
    </>
  );
};

export default ShowBookInfo;
