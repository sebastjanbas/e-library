import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full h-screen flex flex-col gap-5">
      <h1 className="text-4xl md:text-5xl xl:text-7xl">From Shelf to Screen in Three Simple Steps</h1>
      <div>
        <h1 className="text-3xl md:4xl xl:5xl">Step 1:</h1>
        <h2 className="text-xl md:2xl xl:3xl">Campture the Cover</h2>
        <p>Snap a picture or manually enter book details</p>
      </div>
      <div>
        <h1 className="text-3xl md:4xl xl:5xl">Step 2:</h1>
        <h2 className="text-xl md:2xl xl:3xl">Auto-Detect or Add Manually</h2>
        <p>Let the app find the book for you or add custom information.</p>
      </div>
      <div>
        <h1 className="text-3xl md:4xl xl:5xl">Step 3:</h1>
        <h2 className="text-xl md:2xl xl:3xl">Organize & Share</h2>
        <p>Sort into libraries, add tags, and share with friends.</p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
