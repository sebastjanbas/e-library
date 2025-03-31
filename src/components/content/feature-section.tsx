import React from "react";

const FeatureSection = () => {
  return (
    <section className="w-full h-screen grid grid-cols-2 grid-rows-2">
      <div>
        <h1 className="text-4xl md:text-5xl xl:text-7xl">
          Organize Like a Pro
        </h1>
        <p>
          Create separate libraries for different spaces - living room, bedroom,
          or office. No more wondering where you last left your favorite novel.
        </p>
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl xl:text-7xl">Smart Search & Filters</h1>
        <p>
          Find any book instantly by title, author, genre, or tags. Filter by
          room, series, or even loanstatus.
        </p>
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl xl:text-7xl">Share Your Libraries</h1>
        <p>
          Easily share entire collection with friends and family. Perfect for
          book swaps or givin recommendations.
        </p>
      </div>
      <div>
        <h1 className="text-4xl md:text-5xl xl:text-7xl">Effortless Scannign</h1>
        <p>Take a photo of the cover, and the app does the rest - auto finding book details online</p>
      </div>
    </section>
  );
};

export default FeatureSection;
