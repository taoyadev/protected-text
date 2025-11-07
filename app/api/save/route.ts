import { NextResponse } from 'next/server';
import { z } from 'zod';
import { rateLimit } from '@/lib/rate-limit';
import { saveSite } from '@/lib/storage';

const bodySchema = z.object({
  siteName: z.string().min(3).max(32).regex(/^[a-z0-9-]+$/),
  encrypted: z.string().min(1),
  iv: z.string().min(1),
  salt: z.string().min(1),
  version: z.number().min(1).default(1),
  size: z.number().min(0).max(500_000),
});

export async function POST(req: Request) {
  const identifier = req.headers.get('x-forwarded-for') ?? 'anonymous';
  const rl = await rateLimit(identifier);

  if (!rl.success) {
    return NextResponse.json({ message: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = bodySchema.parse(await req.json());
    await saveSite(payload.siteName, {
      encrypted: payload.encrypted,
      iv: payload.iv,
      salt: payload.salt,
      version: payload.version,
      size: payload.size,
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[save]', error);
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }
}
