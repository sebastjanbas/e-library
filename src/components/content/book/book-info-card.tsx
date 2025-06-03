"use client";
import { BookType } from "@/schemas";
import React, { useState } from "react";
import { BookImageBackground } from "./book-image-background";
import { AnimatePresence, motion } from "motion/react";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    .toUpperCase();
};

const BookInfoCard = ({ book }: {book: BookType}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="w-[90%] md:w-[500px] overflow-hidden bg-white rounded-3xl h-fit relative transition-all duration-300 ease-in-out"
      style={{ boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)" }}
      layout
    >
      <button
        className=" absolute cursor-pointer italic text-sm top-2 right-6 text-white font-semibold tracking-wider z-50"
        onClick={() => {
          alert("edit button clicked");
        }}
      >
        edit info
      </button>
      {/* <div className="bg-black/15 absolute top-0 w-full h-[36px] rounded-t-3xl z-30" /> */}
      <div className="h-[150px]">
        <BookImageBackground
          variant="bookDetails"
          image={book?.cover_url ?? null}
          title={book.title}
        />
      </div>
      <div className="flex flex-col gap-4 px-8 pt-4 pb-12">
        <div className="flex flex-row gap-2">
          <h1 className="flex-10/12 text-3xl font-semibold">{book.title}</h1>
          <div className="flex-2/12">
            <h4 className="text-[#969696] leading-3">Pages</h4>
            <p className="font-semibold text-lg">{book.page_count}</p>
          </div>
        </div>
        <h2 className="text-xl font-medium">{book.subtitle}</h2>
        <div className="flex flex-row gap-2 min-h-16">
          <div className="flex-1/2">
            <h4 className="text-[#969696]">Authors</h4>
            {book.authors?.map((author, i) => {
              return (
                <p key={i} className="text-base text-nowrap font-semibold">
                  {author}
                </p>
              );
            })}
          </div>
          <div className="flex-1/2">
            <h4 className="text-[#969696]">Categories</h4>
            {book.categories?.map((cat, i) => (
              <p key={i} className="text-base font-semibold">
                {cat}
              </p>
            ))}
          </div>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="expand-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-row gap-2">
                <div className="flex-1/2">
                  <h4 className="text-[#969696] text-sm md:text-base">Publisher</h4>
                  <p className="text-sm md:text-lg font-semibold">{book.publisher}</p>
                </div>
                <div className="flex-1/2">
                  <h4 className="text-[#969696] text-sm md:text-base">Publish Date</h4>
                  <p className="text-sm md:text-lg font-semibold">
                    {book.published_date
                      ? formatDate(book.published_date)
                      : "Unknown"}
                  </p>
                </div>
              </div>

              <div className="flex flex-row gap-2 mt-4">
                <div className="flex-3/6 mr-2">
                  <h4 className="text-[#969696] text-sm md:text-base">isbn 13</h4>
                  <p className="text-sm md:text-lg font-semibold">{book.isbn_13}</p>
                </div>
                <div className="flex-2/6">
                  <h4 className="text-[#969696] text-sm md:text-base">isbn 10</h4>
                  <p className="text-sm md:text-lg font-semibold">{book.isbn_10}</p>
                </div>
                <div className="flex-1/6">
                  <h4 className="text-[#969696] text-sm md:text-base">Lang</h4>
                  <p className="text-sm md:text-lg font-semibold">{book.language}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div>
          <h4 className="text-[#969696]">Description</h4>
          <p className="italic text-sm font-medium">
            {book.description &&
              (book.description.length > 175
                ? book.description.slice(0, 175) + " ..."
                : book.description)}
          </p>
        </div>
      </div>
      <button
        className="absolute italic text-sm text-[#969696] bottom-4 left-8 cursor-pointer"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? "- less info" : "+ more info"}
      </button>
      {/* <span>{library.library.name}</span> */}
    </motion.div>
  );
};

export default BookInfoCard;
