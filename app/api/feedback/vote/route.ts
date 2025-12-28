import { NextRequest, NextResponse } from 'next/server';
import { getRedisClient } from '@/lib/redis';

// Valid feature IDs
const VALID_FEATURES = [
  'custom-domains',
  'team-sharing',
  'api-access',
  'file-attachments',
  'longer-retention',
  'priority-support',
] as const;

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

async function checkVoteRateLimit(
  ip: string,
  featureId: string,
): Promise<boolean> {
  const client = getRedisClient();
  const key = 'vote_rl:' + ip + ':' + featureId;
  const existing = await client.get(key);

  if (existing) {
    return false; // Already voted for this feature today
  }

  // Set key with 24-hour expiry
  await client.setex(key, 86400, '1');
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { featureId } = body;

    // Validate feature ID
    if (
      !featureId ||
      !VALID_FEATURES.includes(featureId as (typeof VALID_FEATURES)[number])
    ) {
      return NextResponse.json(
        { error: 'Invalid feature ID' },
        { status: 400 },
      );
    }

    // Get client IP and check rate limit
    const clientIP = getClientIP(request);
    const allowed = await checkVoteRateLimit(clientIP, featureId);

    if (!allowed) {
      return NextResponse.json(
        { error: 'You have already voted for this feature today' },
        { status: 429 },
      );
    }

    // Increment vote count
    const client = getRedisClient();
    const voteKey = 'votes:' + featureId;
    const newCount = await client.incr(voteKey);

    return NextResponse.json({
      success: true,
      featureId,
      votes: newCount,
    });
  } catch (error) {
    console.error('Vote error:', error);
    return NextResponse.json(
      { error: 'Failed to record vote' },
      { status: 500 },
    );
  }
}
