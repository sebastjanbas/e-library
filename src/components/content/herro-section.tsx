import React from "react";
import { Button } from "../ui/button";

const HerroSection = () => {
  return (
    <section className="w-full h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="capitalize text-4xl md:text-5xl xl:text-7xl">
          Your books, organized, anytime, anywhere.
        </h1>
        <p>
          No more duplicates or forgotten favorites. Capture book covers, add
          details, and create your digital home library. Share with friends and
          family - because stories are meant to be shared.
        </p>
        <div className="flex justify-center flex-row gap-3">
        <Button>Scan your first book</Button>
        <Button>Learn More</Button>
        </div>
      </div>
    </section>
  );
};

export default HerroSection;
