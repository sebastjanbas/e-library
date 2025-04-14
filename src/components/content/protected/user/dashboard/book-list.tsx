import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
// import Link from "next/link";
import React from "react";
import { SupabaseBookSchema } from "@/schemas";
import { HorizontalScroller } from "@/components/horizontal-scroll";

type ListProp = {
  list: SupabaseBookSchema[] | null;
};

export const BookList = ({ list }: ListProp) => {
  const formatTitleForPlaceholder = (title: string, maxLines = 3) => {
    const words = title.split(" ");
    const lines: string[] = [];

    for (const word of words) {
      if (lines.length >= maxLines) break;

      lines.push(word); // no padding
    }

    const overflow = words.length > maxLines;
    const text = lines.join("\n") + (overflow ? "\n..." : "");

    return encodeURIComponent(text);
  };
  return (
    <HorizontalScroller itemWidth={128}>
      {list &&
        list.map((book, i) => (
          <div
            key={i}
            className="shrink-0 snap-start rounded-md overflow-hidden shadow-md"
          >
            {/* <Link href={"#"}></Link> */}
            <Dialog>
              <DialogTrigger asChild>
                <div className="cursor-pointer">
                  <Image
                    src={
                      book.cover_url ??
                      `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(book.title)}&font=playfair-display&fontsize=24`
                    }
                    width={128}
                    height={192}
                    alt={book.title}
                    className="h-48 w-32 object-cover"
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-full max-w-3xl">
                <DialogHeader>
                  <DialogTitle>{book.title}</DialogTitle>
                  <DialogDescription>
                    {book.description?.slice(0, 150) + "..."}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-10">
                  <Image
                    src={
                      book.cover_url ??
                      `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(book.title)}&font=playfair-display&fontsize=24`
                    }
                    width={128}
                    height={192}
                    alt={book.title}
                    className="h-48 w-32 object-cover rounded-md"
                  />
                  <div>
                    <p>Subtitle: {book.subtitle ?? "No subtitle"}</p>
                    <p>Authors: {book.authors?.join(" ,") ?? "No authors"}</p>
                    <p>Publisher: {book.publisher ?? "Unknown"}</p>
                    <p>Published date: {book.published_date ?? "No date"}</p>
                    <p>
                      Page count:{" "}
                      {book.page_count === 0 || book.page_count == null
                        ? "Unavailable"
                        : book.page_count}
                    </p>
                    <p>
                      Categories: {book.categories?.join(" ,") ?? "No category"}
                    </p>
                    <p>Lang: {book.language ?? "Unknown"}</p>
                    <a href={book.info_link} className="underline italic">
                      Info link
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}
    </HorizontalScroller>
  );
};
