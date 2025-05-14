'use server'

import { db } from "@/db"
import { booksTable } from "@/db/schema"
import { auth } from "@clerk/nextjs/server"

export const getBooks = async () => {

    await setUserSession()

    const books = await db.select().from(booksTable)
    return books
}

export const setUserSession = async () => {
    const {userId} = await auth();
    if (userId) {
    await db.execute(`SET app.current_user_id = ${userId}`)
    }

}