import { NextResponse } from 'next/server';
import { getVersions } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteName } = body;

    if (!siteName || typeof siteName !== 'string') {
      return NextResponse.json({ error: 'Invalid site name' }, { status: 400 });
    }

    const versions = await getVersions(siteName);

    return NextResponse.json({ versions });
  } catch (err) {
    console.error('Versions error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch versions' },
      { status: 500 }
    );
  }
}
