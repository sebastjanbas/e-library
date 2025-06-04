"use client";
import DialInput from "@/components/inputs/dial-input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Book, ExternalLink } from "lucide-react";
import Link from "next/link";
import React from "react";

type ReadingProps = {
  reading_status: "not_started" | "reading" | "finished" | null;
  current_page: string | null;
  notes: string | null;
  library: {
    id: string;
    name: string;
  };
};

const BookProgressInfo = ({
  totalPages,
  readingInfo,
}: {
  totalPages: string | number;
  readingInfo: ReadingProps;
}) => {
  if (!readingInfo.current_page || !totalPages) {
    return (
      <p className="text-destructive italic">Error getting reading progress</p>
    );
  }

  if (typeof totalPages == "string") {
    totalPages = parseInt(totalPages)
  } 

 const percentage = (parseInt(readingInfo.current_page) / totalPages) * 100;

  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-20 w-full max-w-xl">
      <Dialog>
        <DialogTrigger className="text-sm italic text-foreground/40 md:hover:underline cursor-pointer self-end">pages progress</DialogTrigger>
        <DialogContent className="w-full max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Update reading progress
            </DialogTitle>
            <DialogDescription>
              Write the page number you left off
            </DialogDescription>
          </DialogHeader>
          <div>
            <DialInput max={totalPages} initialValue={parseInt(readingInfo.current_page)} />
          </div>


        </DialogContent>
      </Dialog>

      <p className="italic mb-6 text-lg font-medium">
        &quot;Books don’t just tell stories, they teach you how to live your
        own.&quot;
      </p>
      <>
        <div className="relative h-[28px] w-full rounded-full bg-[#dddddd]">
          <span className="absolute left-3 top-1/2 -translate-y-[calc(50%+2px)] text-[#3e3f40] font-bold italic">
            {readingInfo.current_page}
          </span>
          <span className="absolute right-3 top-1/2 -translate-y-[calc(50%+2px)] text-[#3e3f40] font-bold italic">
            {totalPages}
          </span>
          <div
            className="absolute h-6 w-full rounded-full bg-[#3e3f40]"
            style={{
              clipPath: `inset(0 ${100 - percentage}% 0 0 ${percentage > 7 ? "round 1rem" : ""})`,
              transition: "clip-path 1s",
            }}
          >
            {percentage < 100 ? (
              <>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold italic">
                  {readingInfo.current_page}
                </span>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold italic">
                  {totalPages}
                </span>
              </>
            ) : (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white font-bold italic">
                FINISHED
              </span>
            )}
          </div>
        </div>
      </>
      <button
        style={{
          boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)",
        }}
        className="px-8 py-4 bg-[#3e3f40] text-white font-semibold rounded-full flex justify-center items-center gap-3 cursor-pointer md:hover:bg-[#3e3f40]/90 transition-colors duration-300 ease-in-out"
      >
        <Book /> Start Reading Session
      </button>
      <div className="flex flex-row gap-5">
        <Link
          className="text-foreground/30 inline-flex gap-2 justify-center items-center hover:underline"
          href={`/rooms/${readingInfo.library.id}`}
        >
          Library <ExternalLink size={16} />
        </Link>
        <Link
          className="text-foreground/30 inline-flex gap-2 justify-center items-center hover:underline"
          href={"#"}
        >
          Notes <ExternalLink size={16} />
        </Link>
      </div>
    </div>
  );
};

export default BookProgressInfo;
