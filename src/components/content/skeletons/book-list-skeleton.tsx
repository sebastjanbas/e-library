import React from "react";

const BookListRow = () => {
  return (
    <div className="flex flex-row gap-3 overflow-x-scroll w-full animate-pulse">
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
      <div className="shrink-0 h-48 w-32 md:h-[288px] md:w-[192px] bg-gray-300/70 rounded-md"></div>
    </div>
  );
};
const BookListSkeleton = () => {
  return (
    <div className="flex flex-col gap-16 translate-y-6">
      <BookListRow />
      <BookListRow />
      <BookListRow />
    </div>
  );
};

export default BookListSkeleton;
