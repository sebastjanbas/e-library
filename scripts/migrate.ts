// scripts/migrate.ts
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import 'dotenv/config';

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // ✅ Required for AWS RDS
  },
});

async function main() {
  try {
    await client.connect();
    const db = drizzle(client);
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('✅ Migration completed');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.end();
  }
}

main();

