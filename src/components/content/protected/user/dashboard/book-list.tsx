import React from "react";
import { HorizontalScroller } from "@/components/horizontal-scroll";
import { BookHoverPopover } from "@/components/content/book-hover-popover";

type ListProp = {
  list:
    | {
        id?: string;
        title: string;
        description: string | null;
        categories: string[] | null;
        cover_url?: string | null;
      }[]
    | null;
};

export const formatTitleForPlaceholder = (title: string, maxLines = 3) => {
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

export const BookList = ({ list }: ListProp) => {
  return (
    <HorizontalScroller itemWidth={128}>
      {list &&
        list.map((book, i) => (
          <div
            key={i}
            className="shrink-0 snap-start rounded-md overflow-hidden shadow-md"
          >
            <BookHoverPopover book={book} />
          </div>
        ))}
    </HorizontalScroller>
  );
};
