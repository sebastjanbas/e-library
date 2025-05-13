import "dotenv/config";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import { db } from "./db";

async function main() {
  const user: typeof usersTable.$inferInsert = {
    firstName: "Martin",
    lastName: "Maroni",
    username: "martoniMaroni",
    email: "maronini@example.com",
  };

  // await db.insert(usersTable).values(user);
  // console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  // await db
  //   .update(usersTable)
  //   .set({
  //     username: "martino",
  //   })
  //   .where(eq(usersTable.email, user.email));
  // console.log("User info updated!");
  //
  // const usersUpdated = await db.select().from(usersTable);
  // console.log("Getting all users from the database: ", usersUpdated);

  // await db.delete(usersTable).where(eq(usersTable.email, user.email));
  // console.log("User deleted!");
}

main();
