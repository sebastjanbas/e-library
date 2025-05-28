"use client"
// @ts-expect-error used because colorthief does not have type dependencies
import ColorThief from "colorthief";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function BookImageBackground({ image, title }:{image:string | null, title: string}) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [gradient, setGradient] = useState(
    "linear-gradient(to bottom, #000000, #9ca3af)" // fallback: from black to gray-400
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
        setGradient(`linear-gradient(to bottom, ${topStr}, ${bottomStr})`);
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
      className="h-[85px] w-[85px] rounded-md relative overflow-hidden shadow-xl"
      style={{ background: gradient }}
    >
      <Image
        src={imageSrc}
        alt={title}
        height={1920}
        width={1080}
        className="h-[80px] w-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[8px] rounded-xs"
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
