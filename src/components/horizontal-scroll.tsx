"use client";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface HorizontalScrollerProps {
  children: React.ReactNode;
  itemWidth?: number; // pixels, default 160
  className?: string;
}

export const HorizontalScroller = ({
  children,
  className,
}: HorizontalScrollerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);

  const [hasReachedStart, setReachedStart] = useState(true);
  const [hasReachedEnd, setReachedEnd] = useState(false);

  const scroll = (direction: 1 | -1) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollAmount = container.clientWidth * 0.8;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    if (direction === 1) {
      // Going forward
      if (hasReachedEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
        setReachedStart(true);
        setReachedEnd(false);
      } else {
        const nextScroll = currentScroll + scrollAmount;

        if (nextScroll >= maxScrollLeft - 5) {
          setReachedEnd(true);
        }

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        setReachedStart(false);
      }
    } else {
      // Going backward
      if (hasReachedStart) {
        container.scrollTo({ left: maxScrollLeft, behavior: "smooth" });
        setReachedStart(false);
        setReachedEnd(true);
      } else {
        const nextScroll = currentScroll - scrollAmount;

        if (nextScroll <= 5) {
          setReachedStart(true);
        }

        container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        setReachedEnd(false);
      }
    }
  };

  const startDrag = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
  };

  const stopDrag = () => {
    setIsDragging(false);
  };

  const onDrag = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const dx = dragStartX.current - e.clientX;
    scrollRef.current.scrollLeft += dx;
    dragStartX.current = e.clientX;
  };

  return (
    <div className={cn("relative w-full group", className)}>
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth scrollbar-hide snap-x snap-mandatory"
        onMouseDown={startDrag}
        onMouseUp={stopDrag}
        onMouseLeave={stopDrag}
        onMouseMove={onDrag}
      >
        {children}
      </div>

      <button
        onClick={() => scroll(-1)}
        onMouseDown={(e) => e.stopPropagation()}
        className="cursor-pointer opacity-0 group-hover:opacity-80 absolute left-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-1 py-5 rounded-full hover:bg-black z-10"
      >
        <IoIosArrowBack />
      </button>
      <button
        onClick={() => scroll(1)}
        onMouseDown={(e) => e.stopPropagation()}
        className="cursor-pointer opacity-0 group-hover:opacity-80 absolute right-0 top-1/2 -translate-y-1/2 bg-black/60 text-white px-1 py-5 rounded-full hover:bg-black z-10"
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};
