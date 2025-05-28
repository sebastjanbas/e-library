import BookList from "@/components/content/book/book-list";
import { Filter, List, LoaderCircle, Plus, Search } from "lucide-react";
import React, { Suspense } from "react";

const BooksPage = () => {
  return (
    <div className="mt-14 p-10">
      <div>
        <h1 className="font-semibold text-5xl">Book List</h1>
        <div className="flex flex-row gap-3 w-full justify-end items-center pb-5">
          <span className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer"><List size={20} className="text-foreground/50" /> Sort</span>
          <span className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 px-2 py-1 rounded-md cursor-pointer"><Filter size={20} className="text-foreground/50" /> Filter</span>
          <span className="inline-flex gap-1 text-foregroun/50 tracking-wide items-center hover:bg-foreground/5 pr-2 py-1 rounded-md cursor-pointer"><Plus size={20} className="text-foreground/50" /> Add Book</span>
          <span className='w-1/4 border-[1px] border-foreground/20 p-2 rounded-lg inline-flex gap-3 tracking-wider items-center cursor-text'><Search size={20} className="text-foreground/50" /> Search Books . . .</span>
        </div>
        <div>
          <Suspense
            fallback={
              <div className="flex w-full h-full justify-center items-center">
                <LoaderCircle className="animate-spin text-xl"/>
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
