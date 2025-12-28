import { NextResponse } from 'next/server';
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

export async function GET() {
  try {
    const client = getRedisClient();
    const voteCounts: Record<string, number> = {};

    // Fetch vote counts for all features in parallel
    const promises = VALID_FEATURES.map(async (featureId) => {
      const count = await client.get('votes:' + featureId);
      voteCounts[featureId] = count ? parseInt(count, 10) : 0;
    });

    await Promise.all(promises);

    return NextResponse.json({
      success: true,
      votes: voteCounts,
    });
  } catch (error) {
    console.error('Fetch votes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vote counts' },
      { status: 500 },
    );
  }
}
