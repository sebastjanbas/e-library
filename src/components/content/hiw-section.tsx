import React from "react";

const HowItWorksSection = () => {
  return (
    <section className="w-full max-w-5xl h-fit flex flex-col gap-5 mb-40 px-5 md:p-0">
      <h1 className="text-3xl md:text-4xl xl:text-5xl text-center font-semibold mb-8 md:mb-16">
        From Shelf to Screen in Three Simple Steps
      </h1>
      <div className="flex flex-col gap-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="underline">Step 1:</h4>
            <h2 className="text-2xl">Campture the Cover</h2>
            <p>Snap a picture or manually enter book details</p>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400?text=Demo Image"
              alt="Demo Image"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="underline">Step 2:</h4>
            <h2 className="text-2xl">Auto-Detect or Add Manually</h2>
            <p>Let the app find the book for you or add custom information.</p>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400?text=Demo Image"
              alt="Demo Image"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-0">
          <div className="flex flex-col gap-1">
            <h4 className="underline">Step 3:</h4>
            <h2 className="text-2xl">Organize & Share</h2>
            <p>Sort into libraries, add tags, and share with friends.</p>
          </div>
          <div>
            <img
              src="https://placehold.co/600x400?text=Demo Image"
              alt="Demo Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
