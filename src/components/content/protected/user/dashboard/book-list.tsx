import Image from "next/image";
import React from "react";

type ListProp = {
  list: { title: string; cover_url?: string }[] | null;
};

export const BookList = ({ list }: ListProp) => {
const formatTitleForPlaceholder = (
  title: string,
  maxLines = 3
) => {
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
    <div className="flex flex-row flex-wrap gap-5 items-center justify-evenly w-full">
      {list &&
        list.map((book, i) => (
          <div key={i} className="rounded-md overflow-hidden shadow-md">
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
        ))}
    </div>
  );
};
