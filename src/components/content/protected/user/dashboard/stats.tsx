import React from "react";

export const Stats = ({ stats, author }: { stats: number, author:string }) => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
      <div className="bg-sky-300/50 h-60 w-80 rounded-2xl flex flex-col justify-center items-center">
        <p>Favorite author: {author}</p>
        <span className="text-5xl font-semibold font-number">
          {stats}
        </span>
        <p>Books added</p>
      </div>
      <div className="bg-emerald-300/50 h-60 w-80 rounded-2xl flex justify-center items-center">
        <p>Graphic</p>
      </div>
    </div>
  );
};
