import React from 'react'

export const BookDetailsSkeleton = () => (
  <div className="w-full max-w-6xl animate-pulse">
    <div className="flex gap-10">
      <div className="w-[250px] h-[350px] bg-gray-300 rounded-xl" />
      <div className="flex-1 flex flex-col gap-5">
        <div className="h-6 bg-gray-300 rounded w-2/3" />
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-300 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-48 bg-gray-100 rounded-xl" />
      </div>
    </div>
  </div>
);
