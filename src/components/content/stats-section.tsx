import React from "react";

const StatsSection = () => {
  return (
    <section className="w-full h-screen flex flex-col justify-start items-center gap-10">
      <h1 className=" text-4xl md:text-5xl xl:text-7xl">Stats heading</h1>
      <div className="flex flex-row items-center gap-10">
        <div>
          <h1 className="text-5xl">10 000+</h1>
          <h2>books organized by users</h2>
        </div>
        <div>
          <h1 className="text-5xl">5 000+</h1>
          <h2>shared libraries</h2>
        </div>
        <div>
          <h1 className="text-5xl">3x</h1>
          <h2>faster book retrieval with smart filters</h2>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
