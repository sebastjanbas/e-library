"use server";

import { getDb } from "@/db";
import { librariesTable } from "@/db/schema";
import { toast } from "sonner";

export const getLibraries = async () => {
  const db = await getDb();

  let libraries;
  try {
    libraries = await db
      .select()
      .from(librariesTable);
    return libraries;
  } catch (error) {
    toast.error(
      "Error checking for existing book: " +
        (error instanceof Error ? error.message : String(error))
    );
  }
};
