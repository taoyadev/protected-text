import { NextResponse } from 'next/server';
import { deleteSite } from '@/lib/storage';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { siteName } = body;

    if (!siteName || typeof siteName !== 'string') {
      return NextResponse.json({ error: 'Invalid site name' }, { status: 400 });
    }

    await deleteSite(siteName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Delete error:', err);
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    );
  }
}
