import React from "react";
import { Button } from "../ui/button";
import SignupDialog from "./signup-dialog";

const HerroSection = () => {
  return (
    <section className="w-full max-w-7xl h-screen flex justify-center items-center">
      <div className="flex flex-col gap-4 text-center items-center">
        <h1 className="capitalize font-semibold text-4xl md:text-5xl xl:text-7xl">
          Your books, organized, anytime, anywhere!
        </h1>
        <p className="tracking-tighter">
          No more duplicates or forgotten favorites. Capture book covers, add
          details, and create your digital home library. Share with friends and
          family - because stories are meant to be shared.
        </p>
        <div className="flex px-5 flex-row justify-center w-full max-w-xl gap-2">
          <SignupDialog trigger="Scan your first book" />
          <Button className="rounded-full cursor-pointer flex-1">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HerroSection;
