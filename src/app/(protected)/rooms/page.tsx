import Roomlist from "@/components/content/libraries/room-list";
import React, { Suspense } from "react";
import { Filter, List, LoaderCircle, Plus, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LibraryForm from "@/components/hooks/forms/library-form";

const RoomsPage = () => {
  return (
    <div className="mt-14 p-10">
      <div>
        <h1 className="font-semibold text-5xl pb-5 md:pb-0">My Libraries</h1>
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
                <Plus size={20} className="text-foreground/50" /> Add Library
              </DialogTrigger>
              <DialogContent className="w-full md:w-xl">
                <DialogHeader className="w-full pb-3 flex justify-center items-center">
                  <DialogTitle className="text-center">
                    Add a new Library
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                  <LibraryForm />
              </DialogContent>
            </Dialog>
          </div>
          <div className="w-full md:w-fit">
            <span className="w-full border-[1px] border-foreground/20 py-2 pl-2 pr-5 rounded-lg inline-flex gap-3 tracking-wider items-center cursor-text">
              <Search size={20} className="text-foreground/50" /> Search
              Libraries . . .
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
            {/* TODO: add a number of books to the library field, and increment it everytime a new book gets added to that library */}
            <Roomlist />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default RoomsPage;
