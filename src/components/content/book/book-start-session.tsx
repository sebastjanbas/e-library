"use client";
import { Book, Pause, Play, RotateCw, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const BookStartSessionButton = () => {
  const [showTimer, setShowTimer] = useState(false);
  return (
    <div className="w-full flex justify-center items-center">
      {!showTimer ? (
        <button
          onClick={() => setShowTimer(true)}
          style={{
            boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)",
          }}
          className="px-8 py-4 bg-[#3e3f40] text-white font-semibold rounded-full flex justify-center items-center gap-3 cursor-pointer md:hover:bg-[#3e3f40]/90 transition-colors duration-300 ease-in-out"
        >
          <Book /> Start Reading Session
        </button>
      ) : (
        <Timer setShowTimer={setShowTimer} />
      )}
    </div>
  );
};

export default BookStartSessionButton;

const Timer = ({ setShowTimer }: { setShowTimer: (val: boolean) => void }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [message, setMessage] = useState("Set a timer")
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Convert dials to milliseconds when setting
  const getTotalTimeMs = () => hours * 3600 + minutes * 60 + seconds;

  useEffect(() => {
    setTimeLeft(getTotalTimeMs());
  }, [hours, minutes, seconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            setMessage("Time is up")
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(getTotalTimeMs());
  };

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1);
    const hrs = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const mins = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const secs = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hrs} : ${mins} : ${secs}`;
  };

  return (
    <div
      className="relative bg-white flex flex-col justify-center items-center gap-7 rounded-4xl p-10 w-full"
      style={{ boxShadow: "0px 8px 20px 2px rgba(0, 0, 0, 0.25)" }}
    >
      <button
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowTimer(false)}
      >
        <X size={20} className="text-foreground/60" />
      </button>
      <div className={`flex items-center gap-4 ${isRunning ? "text-foreground/20" : ""}`}>
        <div className="flex flex-col items-center">
          <label className="font-medium">Hours</label>
          <input
            type="number"
            min={0}
            max={23}
            value={String(hours)}
            disabled={isRunning}
            onChange={(e) => setHours(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsRunning(true);
            }}
            className="w-20 border rounded-lg p-2 text-center text-xl font-semibold bg-transparent border-none outline-none 
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-medium">Minutes</label>
          <input
            type="number"
            min={0}
            max={59}
            value={String(minutes)}
            disabled={isRunning}
            onChange={(e) => setMinutes(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsRunning(true);
            }}
            className="w-20 border rounded-lg p-2 text-center text-xl font-semibold bg-transparent border-none outline-none 
      appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
        <div className="flex flex-col items-center">
          <label className="font-medium">Seconds</label>
          <input
            type="number"
            min={0}
            max={59}
            value={String(seconds)}
            disabled={isRunning}
            onChange={(e) => setSeconds(Number(e.target.value))}
            onKeyDown={(e) => {
              if (e.key === "Enter") setIsRunning(true);
            }}
            className="w-20 border rounded-lg p-2 text-center text-xl font-semibold bg-transparent border-none outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      <span className="text-7xl font-semibold">{timeLeft === 0 ? message : formatTime(timeLeft)}</span>

      <div className="flex flex-row gap-5">
        <button
          onClick={handleReset}
          className="cursor-pointer inline-flex gap-2 items-center bg-[#eeeff3] text-[#a6a9b0] rounded-full py-3 px-6 font-semibold"
        >
          <RotateCw size={20} /> Reset
        </button>
        <button
          onClick={() => setIsRunning((prev) => !prev)}
          className={`cursor-pointer inline-flex gap-2 items-center rounded-full py-3 px-6 font-semibold ${isRunning ? "bg-[#e63946] text-white" : "bg-[#3e3f40] text-white"
            }`}
        >
          {isRunning ? (
            <>
              <Pause size={20} stroke="white" /> Pause
            </>
          ) : (
            <>
              <Play size={20} fill="white" stroke="white" /> Start
            </>
          )}
        </button>
      </div>
    </div>
  );
};
