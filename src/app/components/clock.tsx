"use client";
import React, { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <>
      <div className="w-full h-full flex text-4xl flex-col justify-center items-center">
        <p className="text-white w-full  text-center font-seba2">Testing different fonts with this clock!</p>
        <div className="text-white font-thin font-seba">{formatedTime}</div>
      </div>
    </>
  );
};

export default Clock;
