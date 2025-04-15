"use client";

import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { SupabaseBookSchema } from "@/schemas";
import { formatTitleForPlaceholder } from "./protected/user/dashboard/book-list";

export const BookHoverPopover = ({ book }: { book: SupabaseBookSchema }) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          onMouseEnter={() => {
            timeoutRef.current = setTimeout(() => {
              setOpen(true);
            }, 500);
          }}
          onMouseLeave={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            setOpen(false);
          }}
          className="cursor-pointer"
        >
          <Image
            src={
              book.cover_url ??
              `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(book.title)}&font=playfair-display&fontsize=24`
            }
            width={128}
            height={192}
            alt={book.title}
            className="h-48 w-32 md:h-[288px] md:w-[192px] object-cover rounded-md"
          />
        </div>
      </PopoverTrigger>
      <PopoverContent
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        side="top"
        align="center"
        sideOffset={-300}
        className="w-[300px] p-4 bg-background shadow-xl rounded-xl transition-all duration-200"
      >
        <Image
          src={
            book.cover_url ??
            `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(book.title)}&font=playfair-display&fontsize=24`
          }
          width={128}
          height={192}
          alt={book.title}
          className="w-32 h-48 object-cover rounded-md"
        />
        <h3 className="font-semibold mt-2">{book.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {book.description?.slice(0, 100) + "..."}
        </p>
        <div className="mt-3 flex gap-2">
          <button className="text-sm px-3 py-1 rounded bg-primary text-white">
            More Info
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
