"use client";
import { useEffect, useRef, useState } from "react";
import { BrowserMultiFormatReader, NotFoundException } from "@zxing/library";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

export default function BarcodeScanner() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null);
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
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          console.error("No video devices found");
        }
      } catch (error) {
        console.error("Error fetching video devices:", error);
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
              toast("Scanning error: " + err.message);
            }
          },
        );
      } catch (error) {
        console.error("Scanner error:", error);
      }
    }

    startScanning();

    return () => {
      codeReader.reset(); // Cleanup when component unmounts or camera changes
    };
  }, [selectedDeviceId]);

  // Fetch book details
  const fetchBookData = async (isbn: string) => {
    setTimeout(async () => {
      console.log("Fetching book data...");
      const response = await fetch(
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn,
      );
      const data = await response.json();
      if (data?.items) {
        console.log("BOOK DATA: ", data?.items[0].volumeInfo);
        setBook(data.items[0].volumeInfo);
      } else {
        toast.error("Could not find the book!");
      }
      setIsLoading(false);
    }, 5000);
  };

  if (book) {
    return (
      <div className="h-full w-full max-w-7xl">
        <h2>Formatted JSON Output:</h2>
        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {JSON.stringify(book, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen justify-start items-center">
      {isLoading ? (
        <span className="inline-flex gap-2">
          <LoaderCircle className="animate-spin" />
          Looking for the book ...
        </span>
      ) : (
        <>
          <div className="relative w-full h-fit">
            <h2 className="absolute text-white top-5 left-1/2 -translate-x-1/2">
              Scan a Book ISBN
            </h2>
            <div className="absolute left-1/2 -translate-x-1/2 border-[5px] top-1/2 -translate-y-1/2 border-white w-56 h-24 xl:w-96 xl:h-40"></div>
            <video ref={videoRef} className="aspect-auto xl:aspect-video w-full h-fit" />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <h1>Coose a camera</h1>
            <select
              className=""
              onChange={(e) => setSelectedDeviceId(e.target.value)}
              value={selectedDeviceId || ""}
            >
              {devices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label || `Camera ${device.deviceId}`}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
}
