import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";

// You can specify any property from the node-postgres connection options
// NOTE: You need to check the sll when planing to set for a production (AWS)
export const db = drizzle({
  connection: {
    connectionString: process.env.DATABASE_URL!,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});
