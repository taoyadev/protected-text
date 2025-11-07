import { NextRequest, NextResponse } from 'next/server';
import Redis from 'ioredis';

// Valid feature IDs (optional for feedback)
const VALID_FEATURES = [
  'custom-domains',
  'team-sharing',
  'api-access',
  'file-attachments',
  'longer-retention',
  'priority-support',
  'other',
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

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

async function checkFeedbackRateLimit(ip: string): Promise<boolean> {
  const client = getRedisClient();
  const key = `feedback_rl:${ip}`;
  const count = await client.incr(key);

  if (count === 1) {
    // First submission today, set 24-hour expiry
    await client.expire(key, 86400);
  }

  // Allow up to 3 submissions per day
  return count <= 3;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, email, featureId } = body;

    // Validate message
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Message is too long (max 2000 characters)' },
        { status: 400 }
      );
    }

    // Validate email if provided
    if (email && typeof email === 'string' && email.trim().length > 0) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return NextResponse.json(
          { error: 'Invalid email address' },
          { status: 400 }
        );
      }
    }

    // Validate feature ID if provided
    if (featureId && !VALID_FEATURES.includes(featureId)) {
      return NextResponse.json(
        { error: 'Invalid feature ID' },
        { status: 400 }
      );
    }

    // Check rate limit
    const clientIP = getClientIP(request);
    const allowed = await checkFeedbackRateLimit(clientIP);

    if (!allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. You can submit up to 3 feedback messages per day.' },
        { status: 429 }
      );
    }

    // Store feedback
    const client = getRedisClient();
    const timestamp = Date.now();
    const feedbackKey = `feedback:${timestamp}:${Math.random().toString(36).substring(7)}`;

    const feedbackData = {
      message: message.trim(),
      email: email?.trim() || null,
      featureId: featureId || null,
      ip: clientIP,
      createdAt: timestamp,
    };

    await client.set(feedbackKey, JSON.stringify(feedbackData));

    // Add to feedback list for easier retrieval
    await client.lpush('feedback:list', feedbackKey);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your feedback!',
    });
  } catch (error) {
    console.error('Feedback submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    );
  }
}
