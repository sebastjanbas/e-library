"use client";
// @ts-expect-error because color-thief-browser dependecy does not have type declarations
import ColorThief from "color-thief-browser";
import { useEffect, useRef, useState } from "react";
import { formatTitleForPlaceholder } from "../protected/user/dashboard/book-list";

// RGB → HSL conversion
function rgbToHsl([r, g, b]: number[]): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// Adjust brightness
function adjustLightnessContrast(rgb: [number, number, number]): {
  top: [number, number, number];
  bottom: [number, number, number];
} {
  return {
    top: blendWithGray(rgb, 0.1), // deeper color for top
    bottom: blendWithGray(rgb, 0.7), // much lighter for stronger gradient contrast
  };
}

// Desaturate and adjust brightness by blending toward gray
function blendWithGray(
  [r, g, b]: number[],
  factor: number,
): [number, number, number] {
  const gray = 128;
  return [
    Math.round(r + (gray - r) * factor),
    Math.round(g + (gray - g) * factor),
    Math.round(b + (gray - b) * factor),
  ];
}

function pickAccentColor(palette: number[][]): [number, number, number] {
  let best: { rgb: number[]; score: number } | null = null;

  for (const rgb of palette) {
    const [h, s, l] = rgbToHsl(rgb);

    if (l < 10 || l > 80) continue; // reject overly dark or bright
    if (s < 25) continue; // skip desaturated

    const huePreference = (() => {
      // prioritize purple, blue, red, teal
      if ((h >= 250 && h <= 300) || (h >= 200 && h <= 250)) return 1.4;
      if (h >= 0 && h <= 50) return 0.9; // less weight for yellow-orange
      return 1.1; // neutral preference
    })();

    const score = (s / 100) * huePreference * (100 - Math.abs(l - 45)); // prefer mid-lightness

    if (!best || score > best.score) {
      best = { rgb, score };
    }
  }

  return (best?.rgb ?? [30, 30, 30]) as [number, number, number];
}

type BookProps = {
  book: {
    reading_status: "not_started" | "reading" | "finished" | null;
    notes: string | null;
    book: {
      id: string;
      title: string;
      authors: string[] | null;
      image: string | null;
    };
  };
};

export function BookImageBackground({ book }: BookProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [gradient, setGradient] = useState(
    "linear-gradient(to bottom, #1f2937, #111827)",
  );

  useEffect(() => {
    const extractAccentGradient = async () => {
      try {
        const img = imgRef.current;
        const colorThief = new ColorThief();

        const palette = await colorThief.getPalette(img!, 6);
        const base = pickAccentColor(palette);
        const { top, bottom } = adjustLightnessContrast(base);

        const topStr = `rgb(${top.join(",")})`;
        const bottomStr = `rgb(${bottom.join(",")})`;
        setGradient(`linear-gradient(to bottom, ${topStr}, ${bottomStr})`);
      } catch (e) {
        console.warn("Color extraction failed:", e);
      }
    };

    if (imgRef.current?.complete) {
      extractAccentGradient();
    } else {
      imgRef.current?.addEventListener("load", extractAccentGradient);
    }
  }, []);

  return (
    <div
      className="h-[85px] w-[85px] rounded-md relative overflow-hidden shadow-xl"
      style={{
        background: gradient,
        boxShadow: "inset 0 0 12px rgba(0,0,0,0.15)", // soft edge shadow
      }}
    >
      <img
        ref={imgRef}
        crossOrigin="anonymous"
        src={
          book.book.image === "" || book.book.image === null
            ? `https://placehold.co/1280x1920/EEE/31343C/png/?text=${formatTitleForPlaceholder(
                book.book.title,
              )}&font=playfair-display&fontsize=24`
            : book.book.image
        }
        alt={book.book.title}
        className="h-[80px] w-auto absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[8px] rounded-xs"
      />
    </div>
  );
}
