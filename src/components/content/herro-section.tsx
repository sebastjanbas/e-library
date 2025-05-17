import React from "react";
// import { Button } from "../ui/button";
// import SignupDialog from "./signup-dialog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const HerroSection = () => {
  return (
    <section className="w-full max-w-7xl h-screen flex justify-center items-center">
      <div className="flex flex-col gap-7 text-center items-center">
        <h1 className="font-bold tracking-tighter text-4xl md:text-5xl xl:text-7xl">
          Better way to{" "}
          <strong className="text-blue-400 font-semibold uppercase">
            organize
          </strong>
          ,{" "}
          <strong className="text-blue-400 font-semibold uppercase">
            store
          </strong>{" "}
          and{" "}
          <strong className="text-blue-400 font-semibold uppercase">
            capture
          </strong>{" "}
          knowledge
        </h1>
        <p className="tracking-tight text-sm">
          Easiest way to store books you own and get the most out of them.
          Organize your library, track your progress, add notes, challenge
          friends ...
        </p>
        <div className="flex px-5 flex-row justify-center w-full max-w-xl gap-2">
          <span className="bg-blue-400 text-white flex justify-center items-center px-6 py-2 text-sm rounded-full font-medium">
            Join for free
          </span>
          <span className="border-blue-400 border-[1px] text-foreground flex justify-between items-center pl-6 pr-3 py-2 gap-5 text-sm rounded-full font-medium">
            See our plans{" "}
            <span className="bg-blue-400 text-white rounded-full p-1">
              <Link href="/pricing">
                <ArrowRight size="20" />{" "}
              </Link>
            </span>
          </span>

          {/* <SignupDialog trigger="Scan your first book" />
          <Button className="rounded-full cursor-pointer flex-1">
            Learn More
          </Button> */}
        </div>
      </div>
    </section>
  );
};

export default HerroSection;
