import { getRedisClient } from './redis';

const WINDOW = 60; // seconds
const LIMIT = 60;

export interface RateLimitResult {
  success: boolean;
  remaining: number;
}

/**
 * Safely extracts the client IP address from the request headers.
 * Prioritizes Vercel's trusted header to prevent IP spoofing.
 */
export function getClientIP(req: Request): string {
  // Use Vercel's trusted header first (cannot be spoofed)
  const vercelIP = req.headers.get('x-vercel-forwarded-for');
  if (vercelIP) {
    return vercelIP;
  }

  // Fallback to x-forwarded-for, but only take the first IP
  // (the original client, not proxy IPs)
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Final fallback
  return 'unknown';
}

/**
 * Atomic rate limiter using Redis MULTI/EXEC transaction.
 * This prevents race conditions where INCR succeeds but EXPIRE fails,
 * which could leave keys without TTL and cause permanent rate limiting.
 */
export async function rateLimit(identifier: string): Promise<RateLimitResult> {
  const client = getRedisClient();
  const key = `rl:${identifier}`;

  // Use MULTI/EXEC for atomic INCR + EXPIRE
  // This ensures both operations succeed or fail together
  const pipeline = client.multi();
  pipeline.incr(key);
  pipeline.expire(key, WINDOW);

  const results = await pipeline.exec();

  // results is an array of [error, result] tuples
  // First result is from INCR, second from EXPIRE
  if (!results || results[0][0]) {
    // If there's an error, fail open (allow the request)
    // but log it for monitoring
    console.error('[rate-limit] Redis error:', results?.[0]?.[0]);
    return { success: true, remaining: LIMIT };
  }

  const current = results[0][1] as number;

  return {
    success: current <= LIMIT,
    remaining: Math.max(0, LIMIT - current),
  };
}
