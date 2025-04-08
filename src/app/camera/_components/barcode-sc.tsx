/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Camera, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<any>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState<number>(0);
  const [extended, setExtended] = useState(false);
  const MAX_LENGTH = 150;
  const codeReaderRef = useRef(new BrowserMultiFormatReader());

  // Fetch available cameras
  useEffect(() => {
    async function getCameras() {
      try {
        // Request camera permissions
        await navigator.mediaDevices.getUserMedia({ video: true });

        const mediaDevices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = mediaDevices.filter(
          (device) => device.kind === "videoinput",
        );

        if (videoDevices.length > 0) {
          // Set devices and select the first available camera
          setDevices(videoDevices);
          setSelectedDeviceId(
            (
              videoDevices.find((device) =>
                device.label.toLowerCase().includes("back"),
              ) || videoDevices[0]
            ).deviceId,
          );
        } else {
          toast.error("No video devices found");
        }
      } catch (error) {
        toast.error("Error fetching video devices: " + error);
      }
    }

    getCameras();
  }, []);
  // Start scanning when a device is selected
  useEffect(() => {
    if (!selectedDeviceId || !videoRef.current) return;

    const codeReader = codeReaderRef.current;
    codeReader.reset(); // Reset scanner before starting a new session

    async function startScanning() {
      try {
        await codeReader.decodeFromVideoDevice(
          selectedDeviceId,
          videoRef.current!,
          (result, err) => {
            if (result) {
              setIsLoading(true);
              console.log("ISBN: ", result.getText());
              fetchBookData(result.getText());
              codeReader.reset(); // Stop scanning after detection
            }
            if (err && !(err instanceof NotFoundException)) {
              toast.error("Scanning error: " + err.message);
              setResetCounter(resetCounter + 1);
            }
          },
        );
      } catch (error) {
        toast.error("Scanner error: " + error);
      }
    }

    startScanning();

    return () => {
      codeReader.reset(); // Cleanup when component unmounts or camera changes
    };
  }, [selectedDeviceId, resetCounter]);

  // Fetch book details
  const fetchBookData = async (isbn: string) => {
    setTimeout(async () => {
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn,
      );
      const data = await response.json();
      if (data?.items) {
        setBook(data.items[0].volumeInfo);
      } else {
        toast.error("Could not find the book!");
        setResetCounter(resetCounter + 1);
      }
      setIsLoading(false);
    }, 500);
  };

  const highlightColor = "bg-yellow-300/30";

  if (book) {
    return (
      <>
        <div className="flex flex-col md:flex-row justify-center items-start mt-20 h-full w-full max-w-7xl gap-y-6 md:gap-0">
          <div className="flex-1 justify-center items-center">
            {book.imageLinks ? (
              <Image
                className="w-[200px] justify-self-center h-auto object-contain"
                width={128}
                height={192}
                src={book.imageLinks.thumbnail}
                alt={`${book.title} thumbnail`}
              />
            ) : (
              <img
                className="w-[200px] justify-self-center h-auto object-contain"
                src="https://placehold.co/128x192?text=Image\nThumbnail"
                alt="Image thumbnail"
              />
            )}
          </div>
          <div className="flex-1/2">
            <p className="font-bold text-lg">
              Title: {book?.title ?? "No title"}
            </p>
            <p>
              <span className={highlightColor}>Subtitle:</span>{" "}
              {book?.subtitle ?? "No subtitle"}
            </p>
            <p>
              <span className={highlightColor}>Authors:</span>{" "}
              {book?.authors?.join(", ") ?? "Unknown"}
            </p>
            <p>
              <span className={highlightColor}>Publisher:</span>{" "}
              {book.publisher ?? "Unknown"}{" "}
            </p>
            <p>
              <span className={highlightColor}>Published date:</span>{" "}
              {book?.publishedDate ?? "No date"}
            </p>
            <p className="my-3 ">
              <span className={highlightColor}>Description:</span>{" "}
              <span className="text-sm md:text-[16px]">
                {extended
                  ? (book.description ?? "No description")
                  : book?.description.slice(0, MAX_LENGTH) + " ..."}
              </span>
              <Button variant={"link"} className="cursor-pointer" onClick={() => setExtended(!extended)}>
                {extended ? "Read less" : "Read more"}
              </Button>
            </p>
            <p>
              <span className={highlightColor}>Page count:</span>{" "}
              {book?.pageCount === 0 || book?.pageCount == null
                ? "Not available"
                : book.pageCount}
            </p>
            <p>
              <span className={highlightColor}>Type:</span>{" "}
              {book?.printType ?? "Unknown"}
            </p>
            <p>
              <span className={highlightColor}>Categories:</span>{" "}
              {book?.categories?.join(" ,") ?? "Unknown"}
            </p>
            <p>
              <span className={highlightColor}>Language:</span>{" "}
              {book?.language ?? "Unknown"}
            </p>
            <p>
              <span className={highlightColor}>Info link:</span>{" "}
              <a
                href={book?.infoLink ?? "#"}
                target="_blank"
                className="italic underline"
              >
                google books link
              </a>
            </p>
            <Button className="mt-5 md:hover:scale-105">Add Book to Library</Button>
           {/* HACK: create the database table and upload the book data  */}
          </div>
        </div>
        {/* <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}> */}
        {/*   {JSON.stringify(book, null, 2)} */}
        {/* </pre> */}
      </>
    );
  }

  return (
    <div className="relative flex flex-col w-full h-fit justify-start items-center">
      {isLoading ? (
        <span className="inline-flex gap-2">
          <LoaderCircle className="animate-spin" />
          Looking for the book ...
        </span>
      ) : (
        <>
          <h2 className="absolute text-white top-5 left-1/2 -translate-x-1/2">
            Scan a Book ISBN
          </h2>
          <div className="absolute bottom-2 z-50 left-1/2 -translate-x-1/2 flex flex-col justify-center items-center w-full">
            <div className="flex justify-center items-center border rounded-lg p-2 cursor-pointer bg-white">
              <Camera className="w-5 h-5 mr-2" />
              <select
                className="w-full bg-transparent appearance-none outline-none cursor-pointer"
                onChange={(e) => setSelectedDeviceId(e.target.value)}
                value={selectedDeviceId || ""}
              >
                {devices.map((device) => (
                  <option
                    key={device.deviceId}
                    value={device.deviceId}
                    className="text-center"
                  >
                    {device.label || `Camera ${device.deviceId}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <video
            ref={videoRef}
            className="aspect-auto xl:aspect-video w-full h-fit"
          />
        </>
      )}
    </div>
  );
}
