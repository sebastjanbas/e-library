import React from "react";


type ListProp = {
  list: {title:string, cover_url: string }[] | null;
};

export const BookList = ({ list }: ListProp) => {
  return (
    <div className="flex flex-row flex-wrap gap-5 items-center justify-evenly w-full">
      {list && list.map((book, i) => (
        <div key={i} className="rounded-md overflow-hidden shadow-md">
          <img
            src={book.cover_url}
            alt={book.title}
            className="h-48 w-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
}
