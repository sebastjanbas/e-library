import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/db";
import { booksTable, libraryBooksTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";

export async function GET(req: NextRequest) {
  const db = await getDb();
  const { searchParams } = new URL(req.url);
  const offset = parseInt(searchParams.get("offset") || "0");
  const limit = parseInt(searchParams.get("limit") || "20");

  try {
    const books = await db
      .select({
        reading_status: libraryBooksTable.reading_status,
        current_page: libraryBooksTable.current_page,
        book: {
          id: booksTable.id,
          title: booksTable.title,
          authors: booksTable.authors,
          image: booksTable.cover_url,
          page_count: booksTable.page_count,
        },
      })
      .from(libraryBooksTable)
      .innerJoin(booksTable, eq(libraryBooksTable.book_id, booksTable.id))
      .offset(offset)
      .limit(limit);

    const [{ total }] = await db.select({ total: count() }).from(booksTable);

    return NextResponse.json({ books, total });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error fetching books", { status: 500 });
  }
}
