'use server'

import { Client } from 'pg'


export async function testConnection() {

  const client = new Client({ connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false, // For RDS without proper certs
    },
  })

  try {
    await client.connect()
    const res = await client.query('SELECT NOW()')
    await client.end()
    return res.rows[0]
  } catch (err) {
    console.error('Database connection error:', err)
    throw err
  }
}