"use client";
import { formatDate, languageMap } from "@/lib/docs";
import { BookType } from "@/schemas";
import { Building, CalendarDays, Ruler } from "lucide-react";
import Image from "next/image";
import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { BsStarFill } from "react-icons/bs";
import { IoIosGlobe } from "react-icons/io";

type BookContextType = PropsWithChildren & {
  bookInfo: BookType;
};

const BookContext = createContext<BookContextType | undefined>(undefined);

const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within a Book");
  }
  return context;
};

export default function Book({ bookInfo, children }: BookContextType) {
  return (
    <BookContext.Provider value={{ bookInfo }}>
      <div className="w-full max-w-6xl">{children}</div>
    </BookContext.Provider>
  );
}

Book.Image = function BookImage({
  className,
  imageLink,
}: {
  className?: string;
  imageLink?: string;
}) {
  const { bookInfo } = useBookContext();

  const image = bookInfo.cover_url ? bookInfo.cover_url : imageLink;
  return (
    <Image
      width={400}
      height={600}
      src={
        image ??
        "https://placehold.co/1280x1920/EEE/31343C/png?text=Image\nThumbnail&font=playfair-display"
      }
      alt={bookInfo.title}
      className={className}
    />
  );
};

Book.Title = function BookTitle() {
  const { bookInfo } = useBookContext();
  return (
    <p className="w-full text-center md:text-start text-2xl md:text-3xl font-semibold pb-1">
      {bookInfo.title}
    </p>
  );
};

Book.Subtitle = function BookSubtitle() {
  const { bookInfo } = useBookContext();
  return (
    <p className="w-full text-center md:text-start text-lg md:text-xl font-semibold pb-2">
      {bookInfo.subtitle ?? "Unknown"}
    </p>
  );
};

Book.Authors = function BookAuthors() {
  const { bookInfo } = useBookContext();
  return (
    <p className="pb-5 w-full text-center md:text-start">
      {bookInfo.authors?.join(", ") ?? "Unknown"}
    </p>
  );
};

Book.Categories = function BookCategories() {
  const { bookInfo } = useBookContext();
  return (
    <p className="text-sm pb-7 italic text-center md:text-start">
      {bookInfo.categories?.join(", ") ?? "Unknown"}
    </p>
  );
};

Book.Description = function BookDescription() {
  const { bookInfo } = useBookContext();
  return (
    <p className="italic leading-relaxed tracking-normal text-justify">
      {bookInfo.description ?? "Not Specified"}
    </p>
  );
};

Book.Description2 = function BookDesctiption2() {
  const [extended, setExtended] = useState(false);
  const { bookInfo } = useBookContext();

  return (
    <div className="inline-flex">
      <div className="text-sm">
        <h1 className="text-md font-semibold">Publisher Description</h1>
        {bookInfo.description ? (
          <>
            <span>
              {extended
                ? bookInfo.description
                : bookInfo.description?.slice(0, 150) + " ..."}
            </span>{" "}
            <button
              className="cursor-pointer p-0 m-0 hover:underline"
              onClick={() => setExtended(!extended)}
            >
              {extended ? "Less" : "More"}
            </button>
          </>
        ) : (
          <p>No description</p>
        )}
      </div>
    </div>
  );
};

Book.Rating = function BookRating({ rating }: { rating: string }) {
  return (
    <div className="flex flex-row items-center gap-3">
      <span className="text-lg font-semibold tracking-tighter w-8">
        {rating}
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
  );
};

Book.Released = function BookReleased({ date }: { date?: string }) {
  const { bookInfo } = useBookContext();
  const releaseDate = bookInfo.published_date ? bookInfo.published_date : date;
  return (
    <div className="flex flex-row gap-3 items-center">
      <CalendarDays className="w-8" />
      <div className="flex flex-col gap-0">
        <h2 className="text-sm text-gray-600">Released</h2>
        <p className="font-semibold leading-4">
          {releaseDate ? formatDate(releaseDate) : "Unknown"}
        </p>
      </div>
    </div>
  );
};

Book.Language = function BookLanguage() {
  const { bookInfo } = useBookContext();
  return (
    <div className="flex flex-row gap-3 items-center">
      <IoIosGlobe size={27} className="w-8" />
      <div className="flex flex-col gap-0">
        <h2 className="text-sm text-gray-600">Language</h2>
        <p className="font-semibold leading-4">
          {languageMap[bookInfo.language] ?? bookInfo.language}
        </p>
      </div>
    </div>
  );
};

Book.Length = function BookLenght({ pages }: { pages?: string }) {
  const { bookInfo } = useBookContext();
  const pageCount = bookInfo.page_count ? bookInfo.page_count : pages;
  return (
    <div className="flex flex-row gap-3 items-center">
      <Ruler className="rotate-[-45deg] w-8" />
      <div className="flex flex-col gap-0">
        <h2 className="text-sm text-gray-600">Length</h2>
        <p className="font-semibold leading-4">{pageCount ?? 0}</p>
      </div>
    </div>
  );
};

Book.Publisher = function BookPublisher() {
  const { bookInfo } = useBookContext();
  return (
    <div className="flex flex-row gap-3 items-center">
      <Building className="w-8" />
      <div className="flex flex-col gap-0">
        <h2 className="text-sm text-gray-600">Publisher</h2>
        <p className="font-semibold leading-4">
          {bookInfo.publisher ?? "Unknown"}
        </p>
      </div>
    </div>
  );
};
