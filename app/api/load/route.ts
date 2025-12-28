import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSite } from '@/lib/storage';
import { rateLimit, getClientIP } from '@/lib/rate-limit';

const schema = z.object({
  siteName: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9-]+$/),
});

export async function POST(req: Request) {
  const identifier = getClientIP(req);
  const rl = await rateLimit(`load:${identifier}`);

  if (!rl.success) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  try {
    const { siteName } = schema.parse(await req.json());
    const site = await getSite(siteName);

    if (!site) {
      return NextResponse.json({ payload: null }, { status: 200 });
    }

    return NextResponse.json({
      payload: {
        encrypted: site.encrypted,
        iv: site.iv,
        salt: site.salt,
        version: site.version,
      },
      updatedAt: site.updatedAt,
    });
  } catch (error) {
    console.error('[load]', error);
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }
}
