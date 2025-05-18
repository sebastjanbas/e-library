import React from "react";
import { toast } from "sonner";
import RoomListToggle from "./room-display-toggle";
import { getDb } from "@/db";
import { librariesTable } from "@/db/schema";
import { count } from "drizzle-orm";

const Roomlist = async () => {
  const db = await getDb();
  let libraries;
  let total;
  try {
    libraries = await db
      .select({ id: librariesTable.id, name: librariesTable.name })
      .from(librariesTable);

    [{ total }] = await db.select({ total: count() }).from(librariesTable);
  } catch (error) {
    toast.error(
      "Error getting rooms: " +
        (error instanceof Error ? error.message : String(error))
    );
    return <p className="text-destructive italic">Error: {String(error)}</p>;
  }

  return (
    <>
      <h2>All items: {total}</h2>
      <RoomListToggle data={libraries} />
    </>
  );
};

export default Roomlist;
