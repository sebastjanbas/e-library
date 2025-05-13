// app/test-db/page.tsx
"use client";
import { testConnection } from "@/actions/database-test";
import { useState } from "react";

export default function TestDbPage() {
  const [result, setResult] = useState<any>(null);

  async function handleTest() {
    try {
      const res = await testConnection();
      console.log(res);
      setResult(res);
    } catch (e) {
      setResult("Error connecting to DB.");
    }
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <button
        className="cursor-pointer hover:bg-foreground/5 py-2 px-4 rounded-2xl"
        onClick={handleTest}
      >
        Test DB Connection
      </button>
      <p>
        {result?.now.toLocaleString("it-IT", {
          timeZone: "Europe/Ljubljana",
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </p>
    </div>
  );
}
