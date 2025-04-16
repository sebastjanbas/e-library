/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { Camera, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import ShowBookInfo from "@/components/content/book/show-book-info";

export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<any>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
  const [resetCounter, setResetCounter] = useState<number>(0);
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


  if (book) {
    return (
      <>
        <ShowBookInfo book={book} />
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
        <div className="mt-5 md:mt-20">
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
        </div>
      )}
    </div>
  );
}
