import { NextResponse } from 'next/server';
import Redis from 'ioredis';

// Valid feature IDs
const VALID_FEATURES = [
  'custom-domains',
  'team-sharing',
  'api-access',
  'file-attachments',
  'longer-retention',
  'priority-support',
];

// Create Redis client singleton
let redis: Redis | null = null;

function getRedisClient(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || process.env.KV_URL;
    if (!redisUrl) {
      throw new Error('REDIS_URL or KV_URL environment variable is not set');
    }
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      lazyConnect: false,
    });
  }
  return redis;
}

export async function GET() {
  try {
    const client = getRedisClient();
    const voteCounts: Record<string, number> = {};

    // Fetch vote counts for all features in parallel
    const promises = VALID_FEATURES.map(async (featureId) => {
      const count = await client.get(`votes:${featureId}`);
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
      { status: 500 }
    );
  }
}
