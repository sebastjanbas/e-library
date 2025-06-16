import React from "react";
import { toast } from "sonner";
import { getDb } from "@/db";
import { librariesTable } from "@/db/schema";
import { count } from "drizzle-orm";
import LibraryList from "./library-list";

const Roomlist = async () => {
  const db = await getDb();
  let libraries;
  let total;
  try {
    libraries = await db
      .select({ id: librariesTable.id, name: librariesTable.name })
      .from(librariesTable);

    [{ total }] = await db.select({ total: count() }).from(librariesTable);
    // [{ total:bookNum}] = await db.select({total:count()}).from(libraryBooksTable).where(eq(libraryBooksTable.library_id, ))
  } catch (error) {
    toast.error(
      "Error getting rooms: " +
        (error instanceof Error ? error.message : String(error)),
    );
    return <p className="text-destructive italic">Error: {String(error)}</p>;
  }

  // const dummyLibraries = [
  //   {id: 1, name: "Lib1"},
  //   {id: 2, name: "Lib2"},
  //   {id: 3, name: "Lib3"},
  //   {id: 4, name: "Lib4"},
  //   {id: 5, name: "Lib5"},
  //   {id: 6, name: "Lib6"},
  //   {id: 7, name: "Lib7"},
  //   {id: 8, name: "Lib8"},
  //   {id: 9, name: "Lib9"},
  //   {id: 10, name: "Lib10"},
  // ]

  return (
    <>
      {/* <RoomListToggle data={libraries} /> */}
      <LibraryList libraries={libraries} />
      <p className="italic text-foreground/50 w-full flex justify-center items-center mt-8">{total} Libraries found</p>
    </>
  );
};

export default Roomlist;
