import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const Roomlist = async () => {
  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("libraries")
    .select("*", { count: "exact" });

  if (error) {
    toast.error("Error getting rooms: " + error.message);
  }

  return (
    <>
      <h2>All items: {count}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 space-y-5">
        {data &&
          data.map((room) => (
            <Link href={`/rooms/${room.id}`}  key={room.id}>
              <li className="w-full h-32 bg-blue-200 rounded-xl flex justify-center items-center">
                <span className="text-white text-4xl font-number font-bold">
                  {room.name}
                </span>
              </li>{" "}
            </Link>
          ))}
      </ul>
    </>
  );
};

export default Roomlist;
