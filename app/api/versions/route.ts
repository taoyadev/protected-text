import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { getVersions } from '@/lib/storage';

const bodySchema = z.object({
  siteName: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9][a-z0-9-]{2,31}$/),
});

export async function POST(request: Request) {
  const identifier = getClientIP(request);
  const rl = await rateLimit(`versions:${identifier}`);

  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = bodySchema.parse(await request.json());
    const versions = await getVersions(payload.siteName);

    return NextResponse.json({ versions });
  } catch (err) {
    console.error('[versions]', err);
    if (err instanceof Error && err.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 },
    );
  }
}
