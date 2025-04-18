"use client";

import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { formatTitleForPlaceholder } from "./protected/user/dashboard/book-list";
import Link from "next/link";
import { Button } from "../ui/button";

export const BookHoverPopover = ({
  book,
}: {
  book: {
    id?: string,
    title: string;
    description: string;
    cover_url?: string;
    categories: string[] | null;
  };
}) => {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Link href={`/book-info/${book.id}`}>
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
        </Link>
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
          <Button asChild>
            <Link href={`/book-info/${book.id}`}>
            More Info
            </Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
