"use client";
// @ts-expect-error used because colorthief does not have type dependencies
import ColorThief from "colorthief";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";

const containerVariants = cva("relative overflow-hidden shadow-xl", {
  variants: {
    variant: {
      default: "h-[85px] w-[85px] rounded-md",
      bookDetails: "h-full w-full rounded-t-3xl",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const imageVariants = cva("absolute bottom-0 left-1/2 -translate-x-1/2 z-40", {
  variants: {
    variant: {
      default: "h-[80px] w-auto translate-y-[8px] rounded-xs",
      bookDetails: "h-[180px] w-auto translate-y-[28%] rounded-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export function BookImageBackground({
  image,
  title,
  variant = "default",
}: {
  image: string | null;
  title: string;
  variant?: "default" | "bookDetails";
}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [gradient, setGradient] = useState(
    "conic-gradient(from 180deg at 50% 50%, #2E2F30 0deg, #D2D7D8 360deg)",
  );

  useEffect(() => {
    const extractGradient = async () => {
      const img = imgRef.current;
      if (!img || !img.complete) return;

      try {
        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(img, 6);
        const top = palette[0];
        const bottom = palette[1];

        const topStr = `rgb(${top[0]}, ${top[1]}, ${top[2]})`;
        const bottomStr = `rgb(${bottom[0]}, ${bottom[1]}, ${bottom[2]})`;
        setGradient(
          `conic-gradient(from 180deg at 50% 50%, ${topStr} 0deg, ${bottomStr} 360deg)`,
        );
      } catch (error) {
        console.error("Color extraction failed:", error);
      }
    };

    if (imgRef.current?.complete) {
      extractGradient();
    } else {
      imgRef.current!.addEventListener("load", extractGradient);
    }
  }, [image]);

  const imageSrc =
    image === "" || image === null
      ? `https://placehold.co/1280x1920/EEE/31343C/png/?text=${title}&font=playfair-display&fontsize=24`
      : image;

  return (
    <div
      className={containerVariants({ variant })}
      style={{ background: gradient }}
    >
      <Image
        src={imageSrc}
        alt={title}
        height={1920}
        width={1080}
        className={imageVariants({ variant })}
        style={{boxShadow:' 0px 8px 20px 2px rgba(0, 0, 0, 0.50)'}}
      />
      {/* Hidden img for color extraction */}
      <img
        ref={imgRef}
        src={imageSrc}
        crossOrigin="anonymous"
        alt="color-thief-hidden"
        className="hidden"
      />
    </div>
  );
}
