import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getSite } from '@/lib/storage';

const schema = z.object({
  site: z.string().min(3).max(32).regex(/^[a-z0-9-]+$/),
});

export async function GET(req: Request) {
  const url = new URL(req.url);
  const input = schema.safeParse({ site: url.searchParams.get('site') ?? '' });

  if (!input.success) {
    return NextResponse.json({ message: 'Invalid site' }, { status: 400 });
  }

  const site = await getSite(input.data.site);

  return NextResponse.json({ exists: Boolean(site), updatedAt: site?.updatedAt });
}
