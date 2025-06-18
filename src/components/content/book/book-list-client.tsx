"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { badgeStatus } from "@/lib/docs";
import { EllipsisVertical, Filter, List, Plus, Search, X } from "lucide-react";
import { BookImageBackground } from "./book-image-background";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Book = {
  current_page: string | null;
  reading_status: "not_started" | "reading" | "finished" | null;
  book: {
    id: string;
    title: string;
    authors: string[] | null;
    image: string | null;
    page_count: number | null;
  };
}[];

type FilterType = {
  property: string;
  operation: string;
  input: string;
};

const BookListClient = () => {
  const router = useRouter();
  const [books, setBooks] = useState<Book>([]);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const loadBooks = useCallback(async () => {
    if (loading || allLoaded) return;

    setLoading(true);
    const res = await fetch(`/api/load-books?offset=${offset}&limit=20`);
    const data = await res.json();

    setTotal(data.total);

    setBooks((prev) => [...prev, ...data.books]);

    const newOffset = offset + data.books.length;
    setOffset(newOffset);

    if (newOffset >= data.total) {
      setAllLoaded(true);
    }

    setLoading(false);
  }, [offset, loading, allLoaded]);

  useEffect(() => {
    if (allLoaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadBooks();
        }
      },
      { threshold: 1 },
    );
    if (observerRef.current) observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [loadBooks, allLoaded]);

  const createFilter = () => {
    setFilters((prev) => [...prev, { property: "", operation: "", input: "" }]);
  };
  const removeFilter = (index: number) => {
    setFilters((prev) => {
      const newFilters = prev.filter((_, i) => i !== index);
      return newFilters;
    });
  };
  const clearFilter = () => {
    setFilters([]);
  };

  const updateFilter = (index: number, updated: Partial<FilterType>) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, ...updated } : filter,
      ),
    );
  };

  return (
    <>
      <span className="italic text-foreground/50">Books owned: {total}</span>
      <div className="flex flex-col md:flex-row gap-3 w-full justify-end items-center pb-5">
        <div className="flex flex-row justify-start items-center w-full md:w-fit">
          <SortButton />
          <FilterButton num={filters.length} clearFilter={clearFilter} createFilter={createFilter} />
          <AddBookButton />
        </div>

        <SearchBookField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="my-5 flex flex-col gap-3">
        <span>SEARCH QUERY: {searchQuery}</span>
        {filters.map((filter, i) => (
          <FilterComponent
            key={i}
            {...filter}
            num={i}
            remove={removeFilter}
            create={createFilter}
            clear={clearFilter}
            update={updateFilter}
          />
        ))}
      </div>

      <ul className="flex flex-col lg:grid lg:grid-cols-2 gap-5">
        {books.map((book, i) => (
          <li
            key={i}
            onClick={() => router.push(`/book-info/${book.book.id}`)}
            className="bg-background rounded-2xl p-4 flex flex-col sm:flex-row gap-y-2 justify-between cursor-pointer"
            style={{ boxShadow: "0px 8px 20px 3px rgba(0, 0, 0, 0.20)" }}
          >
            <div className="flex flex-row gap-3 items-start">
              <div className="w-[90px]">
                <BookImageBackground
                  image={book.book.image}
                  title={book.book.title}
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl font-medium tracking-wide">
                  {book.book.title}
                </h3>
                <h4 className="text-foreground/60 italic">
                  {book.book.authors?.join(", ")}
                </h4>
                <span
                  className={`${parseInt(book.current_page ?? "0") < 1 ? "hidden" : ""} font-medium text-lg`}
                >
                  {book.current_page &&
                    book.book.page_count &&
                    Math.round(
                      (parseInt(book.current_page) / book.book.page_count) *
                        100,
                    )}
                  % <span className="text-sm text-foreground/50">finished</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-between items-center gap-5">
              <Badge
                className="w-[85px] h-fit flex"
                variant={book.reading_status}
              >
                {badgeStatus[book.reading_status ?? "not_started"]}
              </Badge>
              <span className="cursor-pointer">
                <EllipsisVertical />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div ref={observerRef} className="h-10" />

      {loading && <p className="text-center">Loading...</p>}
      {allLoaded && (
        <p className="text-center text-muted-foreground">All books loaded</p>
      )}
    </>
  );
};

export default BookListClient;

const SortButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer">
        <List size={20} className="text-foreground/50" /> Sort
      </DialogTrigger>
      <DialogContent className="w-full md:w-fit">
        <DialogHeader className="w-full pb-3 flex justify-center items-center">
          <DialogTitle className="text-center">Add a new book</DialogTitle>
          <DialogDescription className="text-center max-w-2xl">
            Choose how you’d like to add your book to the library.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3 w-full justify-self-center">
          <Button className="flex-1 w-full cursor-pointer rounded-full" asChild>
            <Link href={"/add-book"}>Enter Details Manually</Link>
          </Button>
          <Button asChild className="flex-1 w-full rounded-full">
            <Link href={"/camera"}>Scan Book ISBN</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const FilterButton = ({
  num,
  createFilter,
  clearFilter,
}: {
  num: number;
  createFilter: () => void;
  clearFilter: () => void;
}) => {
  return (
    <button
      onClick={() => {
        if (num === 0){
          createFilter()
        } else {
          clearFilter()
        }
      }}
      className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer"
    >
      <Filter size={20} className="text-foreground/50" /> Filter
    </button>
  );
};

const AddBookButton = () => {
  return (
    <Dialog>
      <DialogTrigger className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 pr-2 py-1 rounded-md cursor-pointer">
        <Plus size={20} className="text-foreground/50" /> Add Book
      </DialogTrigger>
      <DialogContent className="w-full md:w-fit">
        <DialogHeader className="w-full pb-3 flex justify-center items-center">
          <DialogTitle className="text-center">Add a new book</DialogTitle>
          <DialogDescription className="text-center max-w-2xl">
            Choose how you’d like to add your book to the library.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col justify-center items-center gap-3 w-full justify-self-center">
          <Button className="flex-1 w-full cursor-pointer rounded-full" asChild>
            <Link href={"/add-book"}>Enter Details Manually</Link>
          </Button>
          <Button asChild className="flex-1 w-full rounded-full">
            <Link href={"/camera"}>Scan Book ISBN</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const SearchBookField = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <span className="w-full max-w-1/3 px-2 border-[1px] border-foreground/20 rounded-lg inline-flex gap-3 tracking-wider items-center cursor-text">
      <Search size={20} className="text-foreground/50" />
      <Input
        type="text"
        value={searchQuery}
        autoComplete="off"
        placeholder="Search Books ..."
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full h-full p-2 !focus:ring-0 !focus:outline-none !ring-transparent !outline-none border-none"
      />
    </span>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
// FIX: change the types to be type safe
const FilterComponent = (props: any) => {
  return (
    <div className="my-1 inline-flex items-center gap-2 w-full">
      <button
        onClick={() => props.remove(props.num)}
        className="p-1 cursor-pointer rounded-full bg-background shadow-foreground/30 shadow-sm"
      >
        <X size={20} />
      </button>
      <span className="py-1 px-2">{props.num === 0 ? "where" : "and"}</span>
      <Select
        value={props.property}
        onValueChange={(val) => props.update(props.num, { property: val })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder={"Select a property"} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Properties</SelectLabel>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
            <SelectItem value="category">Category</SelectItem>
            <SelectItem value="publish_date">Publish Date</SelectItem>
            <SelectItem value="reading_status">Reading Status</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Select
        value={props.operation}
        onValueChange={(val) => props.update(props.num, { operation: val })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue
            placeholder={"Select a condition"}
            defaultValue={"title"}
          />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Conditions</SelectLabel>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="not_equals">Not Equals</SelectItem>
            <SelectItem value="in">In</SelectItem>
            <SelectItem value="greater">Greater</SelectItem>
            <SelectItem value="greater_or_equal">Greater of Equal</SelectItem>
            <SelectItem value="less">less</SelectItem>
            <SelectItem value="less_or_equal">Less of Equal</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <span>
        <Input
          value={props.input}
          onChange={(e) => props.update(props.num, { input: e.target.value })}
        />
      </span>
      {props.num === 0 && (
        <>
          <button
            onClick={() => props.create()}
            className="py-1 px-3 cursor-pointer rounded-full bg-background shadow-foreground/30 shadow-sm"
          >
            + Add filter
          </button>
          <button
            onClick={() => props.clear()}
            className="px-2 py-1 cursor-pointer hover:underline"
          >
            Clear filters
          </button>
        </>
      )}
    </div>
  );
};
