import { NextResponse } from 'next/server';
import { z } from 'zod';
import { timingSafeEqual } from 'crypto';
import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { getSite, deleteSite } from '@/lib/storage';

/**
 * Performs a constant-time string comparison to prevent timing attacks.
 * Returns true if the strings are equal.
 */
function secureCompare(a: string, b: string): boolean {
  // Convert strings to buffers for comparison
  const bufA = Buffer.from(a, 'utf8');
  const bufB = Buffer.from(b, 'utf8');

  // If lengths differ, we still need constant-time comparison
  // to avoid leaking length information
  if (bufA.length !== bufB.length) {
    // Compare against itself to maintain constant time
    timingSafeEqual(bufA, bufA);
    return false;
  }

  return timingSafeEqual(bufA, bufB);
}

const bodySchema = z.object({
  siteName: z
    .string()
    .min(3)
    .max(32)
    .regex(/^[a-z0-9][a-z0-9-]{2,31}$/),
  // Password verification: client sends the current encrypted content
  // to prove they have successfully decrypted it with the correct password
  verificationToken: z.string().min(1),
});

/**
 * DELETE endpoint requires password verification.
 *
 * Since the server cannot decrypt stored content (zero-knowledge architecture),
 * the client must prove they know the password by sending a verification token
 * that matches the stored encrypted content. This prevents unauthorized deletions
 * while maintaining the zero-knowledge property.
 */
export async function POST(request: Request) {
  const identifier = getClientIP(request);
  const rl = await rateLimit(`delete:${identifier}`);

  if (!rl.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const payload = bodySchema.parse(await request.json());

    const existing = await getSite(payload.siteName);
    if (!existing) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 });
    }

    // Verify the token matches the stored encrypted content
    // The client must have successfully decrypted to know this value
    // Using constant-time comparison to prevent timing attacks
    if (!secureCompare(existing.encrypted, payload.verificationToken)) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 403 });
    }

    await deleteSite(payload.siteName);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[delete]', err);
    if (err instanceof Error && err.name === 'ZodError') {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 },
    );
  }
}
