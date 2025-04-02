import React from "react";

const FeatureSection = () => {
  return (
    <section className="w-full max-w-7xl h-fit md:h-screen mb-40 md:mb-0">
      <div className="grid grid-cols-1 md:grid-cols-20 grid-rows-4 md:grid-rows-2 gap-x-3 gap-y-5">
        <div className="col-span-8 row-span-1 rotate-[3deg] md:hover:rotate-[-2deg] transition-transform duration-300 ease-in-out border-foreground/30 border-[1px] rounded-3xl flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl pb-2">Organize Like a Pro</h1>
          <p>
            Create separate libraries for different spaces - living room,
            bedroom, or office. No more wondering where you last left your
            favorite novel.
          </p>
        </div>
        <div className="col-span-8 row-span-1 rotate-[-1deg] md:hover:rotate-[4deg] transition-transform duration-300 ease-in-out border-foreground/30 border-[1px] rounded-3xl flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl pb-2">Smart Search & Filters</h1>
          <p>
            Find any book instantly by title, author, genre, or tags. Filter by
            room, series, or even loanstatus.
          </p>
        </div>
        <div className="hidden md:block col-span-4 row-span-1"></div>
        <div className="hidden md:block col-span-4 row-span-1"></div>

        <div className="col-span-8 row-span-1 rotate-[-2deg] md:hover:rotate-[3deg] transition-transform duration-300 ease-in-out border-foreground/30 border-[1px] rounded-3xl flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl pb-2">Share Your Libraries</h1>
          <p>
            Easily share entire collection with friends and family. Perfect for
            book swaps or givin recommendations.
          </p>
        </div>
        <div className="col-span-8 row-span-1 rotate-[4deg] md:hover:rotate-[-1deg] transition-transform duration-300 ease-in-out border-foreground/30 border-[1px] rounded-3xl flex flex-col justify-center items-center p-5">
          <h1 className="text-4xl pb-2">Effortless Scanning</h1>
          <p>
            Take a photo of the cover, and the app does the rest - auto finding
            book details online
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
