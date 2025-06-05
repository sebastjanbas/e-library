"use client";
import { updateCurrentPage } from "@/actions/book-actions";
import DialInput from "@/components/inputs/dial-input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import BookStartSessionButton from "./book-start-session";

type ReadingProps = {
  id: string;
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
  const [percentage, setPercentage] = useState(0);
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(readingInfo.current_page);

  if (typeof totalPages === "string") {
    totalPages = parseInt(totalPages);
  }

  useEffect(() => {
    if (!currentPage || !totalPages) return;

    const current = parseInt(currentPage);
    setPercentage((current / totalPages) * 100);
  }, [currentPage, totalPages]);

  if (!readingInfo.current_page || !totalPages) {
    return (
      <p className="text-destructive italic">Error getting reading progress</p>
    );
  }

  const handleSubmit = async (val: number) => {
    if (!readingInfo.id) return;
    const response = await updateCurrentPage(val, readingInfo.id);
    if (response?.error) {
      toast.error(response.error);
    } else {
      setCurrentPage(val.toString());
    }
    setOpen(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-20 w-full max-w-xl">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger className="text-sm italic text-foreground/40 md:hover:underline cursor-pointer self-end">
          pages progress
        </DialogTrigger>
        <DialogContent className="w-full max-w-xl bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#111111] border-none rounded-4xl">
          <DialogHeader className="text-white relative">
            <button
              onClick={() => {
                if (parseInt(currentPage ?? "0") !== 0) {
                  handleSubmit(0);
                } else {
                  setOpen(false);
                  toast.info("Page number is already 0");
                }
              }}
              className="text-white absolute top-0 right-5 italic hover:bg-[#2c2c2c] py-1 px-4 transition-colors duration-200 ease-in-out rounded-full cursor-pointer"
            >
              reset
            </button>

            <DialogTitle>Update reading progress</DialogTitle>
            <DialogDescription className="text-white">
              Write the page number you left off
            </DialogDescription>
          </DialogHeader>
          <div>
            <DialInput
              handleSubmitAction={handleSubmit}
              max={totalPages}
              initialValue={parseInt(currentPage ?? "0") ?? 0}
            />
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
            {currentPage}
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
                  {currentPage}
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
      <BookStartSessionButton />
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
