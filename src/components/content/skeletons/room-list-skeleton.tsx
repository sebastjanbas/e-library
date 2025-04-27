import React from "react";

const RoomListSkeletoon = () => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 space-y-5">
      {Array.from({ length: 12 }).map((_, i) => (
        <li
          key={i}
          className="w-full h-32 bg-muted animate-pulse rounded-xl flex justify-center items-center"
        >
          <div className="h-6 w-20 bg-muted-foreground/30 rounded-md" />
        </li>
      ))}
    </ul>
  );
};

export default RoomListSkeletoon;
