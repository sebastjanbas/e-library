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
          (device) => device.kind === "videoinput"
        );

        if (videoDevices.length > 0) {
          // Set devices and select the first available camera
          setDevices(videoDevices);
          setSelectedDeviceId(videoDevices[0].deviceId);
        } else {
          console.error('No video devices found');
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
          }
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
        "https://www.googleapis.com/books/v1/volumes?q=isbn:" + isbn
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

  return (
    <div className="flex flex-col w-screen h-screen justify-center items-center">
      {isLoading ? (
        <span className="inline-flex gap-2">
          <LoaderCircle className="animate-spin" />
          Looking for the book ...
        </span>
      ) : (
        <>
          <h2>Scan a Book ISBN</h2>
          <select
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            value={selectedDeviceId || ""}
          >
            {devices.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Camera ${device.deviceId}`}
              </option>
            ))}
          </select>
          <video ref={videoRef} className="mt-4 w-full max-w-lg h-auto" />
        </>
      )}
      {book && (
        <div className="h-full w-full max-w-7xl">
          <h2>Formatted JSON Output:</h2>
          <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
            {JSON.stringify(book, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
