import React from "react";

const StatsSection = () => {
  return (
    <section className="w-full max-w-7xl h-screen flex flex-col justify-start items-center gap-10">
      <h1 className=" text-3xl md:text-4xl xl:text-5xl font-semibold">
        Stats heading
      </h1>
      <div className="flex flex-col md:flex-row w-full items-center md:items-start justify-center gap-5">
        <div className="w-full md:max-w-none md:flex-1 border-[1px] border-foreground/30 justify-center items-center rounded-xl px-4 py-2 rotate-[-2deg] md:hover:rotate-[3deg] transition-transform duration-200 ease-in-out">
          <h1 className="text-5xl text-center font-semibold">10 000+</h1>
          <h2 className="text-center">books organized by users</h2>
        </div>
        <div className="w-full md:max-w-none md:flex-1 border-[1px] border-foreground/30 justify-center items-center rounded-xl px-4 py-2 rotate-[3deg] md:hover:rotate-[-2deg] transition-transform duration-200 ease-in-out">
          <h1 className="text-5xl text-center font-semibold">5 000+</h1>
          <h2 className="text-center">shared libraries</h2>
        </div>
        <div className="w-full md:max-w-none md:flex-1 border-[1px] border-foreground/30 justify-center items-center rounded-xl px-4 py-2 rotate-[-2deg] md:hover:rotate-[3deg] transition-transform duration-200 ease-in-out">
          <h1 className="text-5xl text-center font-semibold">3x</h1>
          <h2 className="text-center">
            faster book retrieval with smart filters
          </h2>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
