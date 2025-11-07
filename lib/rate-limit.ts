import Redis from 'ioredis';

const WINDOW = 60; // seconds
const LIMIT = 60;

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

export async function rateLimit(identifier: string) {
  const client = getRedisClient();
  const key = `rl:${identifier}`;
  const current = await client.incr(key);

  if (current === 1) {
    await client.expire(key, WINDOW);
  }

  return {
    success: current <= LIMIT,
    remaining: Math.max(0, LIMIT - current),
  };
}
