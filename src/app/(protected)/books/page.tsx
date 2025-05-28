import BookList from "@/components/content/book/book-list";
import { Filter, List, LoaderCircle, Plus, Search } from "lucide-react";
import React, { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const BooksPage = () => {
  return (
    <div className="mt-14 p-10">
      <div>
        <h1 className="font-semibold text-5xl pb-5 md:pb-0">Book List</h1>
        <div className="flex flex-col md:flex-row gap-3 w-full justify-end items-center pb-5">
          <div className="flex flex-row justify-start items-center w-full md:w-fit">
            <span className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer">
              <List size={20} className="text-foreground/50" /> Sort
            </span>
            <span className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer">
              <Filter size={20} className="text-foreground/50" /> Filter
            </span>
            <Dialog>
              <DialogTrigger className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 pr-2 py-1 rounded-md cursor-pointer">
                <Plus size={20} className="text-foreground/50" /> Add Book
              </DialogTrigger>
              <DialogContent className="w-full md:w-fit">
                <DialogHeader className="w-full pb-3 flex justify-center items-center">
                  <DialogTitle className="text-center">
                    Add a new book
                  </DialogTitle>
                  <DialogDescription className="text-center max-w-2xl">
                    Choose how you’d like to add your book to the library.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col justify-center items-center gap-3 w-full justify-self-center">
                  <Button
                    className="flex-1 w-full cursor-pointer rounded-full"
                    asChild
                  >
                    <Link href={"/add-book"}>Enter Details Manually</Link>
                  </Button>
                  <Button asChild className="flex-1 w-full rounded-full">
                    <Link href={"/camera"}>Scan Book ISBN</Link>
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full md:w-1/4">
            <span className="w-full border-[1px] border-foreground/20 p-2 rounded-lg inline-flex gap-3 tracking-wider items-center cursor-text">
              <Search size={20} className="text-foreground/50" /> Search Books .
              . .
            </span>
          </div>
        </div>
        <div>
          <Suspense
            fallback={
              <div className="flex w-full h-full justify-center items-center">
                <LoaderCircle className="animate-spin text-xl" />
              </div>
            }
          >
            <BookList />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;
