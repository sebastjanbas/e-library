/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'

import { db } from "@/db"
import { booksTable, usersTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"
import { eq, sql} from "drizzle-orm"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VALID_BOOK_FIELDS = [
 'id',
  'title',
  'subtitle',
  'authors',
  'publisher',
  'published_date',
  'isbn_10',
  'isbn_13',
  'page_count',
  'cover_url',
  'categories',
  'language',
  'info_link',
  'description',
  'created_at',
  'user_id',
] as const;

type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];
type ValidBookField = (typeof VALID_BOOK_FIELDS)[number];

export const getBooks = async (fields:ValidBookField[]) => {
const internalUserId = await setUserSession();

// TODO: enable row level security
  const books = await db.transaction(async (tx) => {
    // Set session variable inside the transaction (bound to tx connection)
    await tx.execute(sql.raw(`SET app.current_user_id = '${internalUserId}'`));

    const columns = fields.reduce((acc, key) => {
      acc[key] = booksTable[key];
      return acc;
    }, {} as Record<ValidBookField, any>);

    // Run your SELECT inside the same tx
    return await tx.select(columns).from(booksTable);
  });

  return books;
}

export const setUserSession = async () => {
    const { userId } = await auth();
  if (!userId) throw new Error('Not signed in');

  // Use Drizzle query builder to get internal UUID
  const [user] = await db
    .select({ id: usersTable.id })
    .from(usersTable)
    .where(eq(usersTable.clerk_id, userId))
    .limit(1);

  if (!user) throw new Error('User not found in DB');

  return user?.id

}

export async function withUserTransaction<T>(
  fn: (tx: Transaction) => Promise<T>
): Promise<T> {
  const userId = await setUserSession();

  return await db.transaction(async (tx) => {
    await tx.execute(
      sql.raw(`SET app.current_user_id = '${userId}'`)
    );
    return await fn(tx);
  });
}