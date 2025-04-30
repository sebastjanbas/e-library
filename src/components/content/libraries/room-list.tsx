import { createClient } from "@/utils/supabase/server";
import React from "react";
import { toast } from "sonner";
import RoomListToggle from "./room-display-toggle";

const Roomlist = async () => {
  const supabase = await createClient();
  const { data, error, count } = await supabase
    .from("libraries")
    .select("id, name", { count: "exact" });

  if (error) {
    toast.error("Error getting rooms: " + error.message);
  }

  return (
    <>
      <h2>All items: {count}</h2>
    <RoomListToggle data={data} />
    </>
  );
};

export default Roomlist;
