import { Webhook } from 'svix';
import { sql } from 'drizzle-orm';
import { WebhookEvent } from '@clerk/nextjs/server';
import { getDb } from '@/db';

export async function POST(req: Request) {
  console.log('✅ Clerk webhook received');

  const db = await getDb();
  const payload = await req.text();
  const headers = req.headers;

  const svixId = headers.get('svix-id');
  const svixTimestamp = headers.get('svix-timestamp');
  const svixSignature = headers.get('svix-signature');

  if (!svixId || !svixTimestamp || !svixSignature) {
    console.error('❌ Missing Svix signature headers');
    return new Response('Missing Svix signature headers', { status: 400 });
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) {
    console.error('❌ Missing webhook secret');
    return new Response('Missing webhook secret', { status: 500 });
  }

  let event: WebhookEvent;
  try {
    const wh = new Webhook(secret);
    event = wh.verify(payload, {
      'svix-id': svixId,
      'svix-timestamp': svixTimestamp,
      'svix-signature': svixSignature,
    }) as WebhookEvent;
    console.log('✅ Webhook verified');
  } catch (err) {
    console.error('❌ Signature verification failed:', err);
    return new Response('Invalid signature', { status: 400 });
  }

  if (event.type === 'user.created') {
    const user = event.data;
    const clerkId = user.id;
    const email = user.email_addresses?.[0]?.email_address ?? null;
    const username = user.username ?? null;
    const firstName = user.first_name ?? null;
    const lastName = user.last_name ?? null;
    const avatarUrl = user.image_url ?? null;
    const createdAt = user.created_at ? new Date(user.created_at) : new Date();

    console.log('📥 Inserting user:', { clerkId, email });

    try {
      await db.execute(sql`
        INSERT INTO users (
          clerk_id, username, first_name, last_name, avatar_url, email, created_at
        ) VALUES (
          ${clerkId}, ${username}, ${firstName}, ${lastName}, ${avatarUrl}, ${email}, ${createdAt}
        )
        ON CONFLICT (clerk_id) DO NOTHING
      `);

      console.log('✅ User inserted into database');
    } catch (e) {
      console.error('❌ Failed to insert user:', e);
      return new Response('DB insert failed', { status: 500 });
    }
  } else {
    console.log(`ℹ️ Ignored event type: ${event.type}`);
  }

  return new Response('OK', { status: 200 });
}