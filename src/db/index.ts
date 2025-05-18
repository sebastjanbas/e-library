import "dotenv/config";
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { auth } from '@clerk/nextjs/server';
// import { drizzle } from "drizzle-orm/node-postgres";
// import { Pool } from 'pg';

// You can specify any property from the node-postgres connection options
// NOTE: You need to check the sll when planing to set for a production (AWS)

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL!,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

// export const db = drizzle(pool);

export async function getDb() {
  const token = (await auth()).getToken();
  if (!token) throw new Error('Missing Clerk token');

  const sql = neon(process.env.DATABASE_AUTHENTICATED_URL!, {
    authToken: async () => {
            const token = await (await auth()).getToken();
            if (!token) {
                throw new Error('No token');
            }
            return token;
        },
  });

  return drizzle(sql);
}


