import Redis from 'ioredis';

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

export type StoredSite = {
  encrypted: string;
  iv: string;
  salt: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  size: number;
  accessCount: number;
};

export async function getSite(siteName: string) {
  const client = getRedisClient();
  const data = await client.get(`site:${siteName}`);
  if (!data) return null;
  return JSON.parse(data) as StoredSite;
}

export async function saveSite(siteName: string, payload: Omit<StoredSite, 'createdAt' | 'updatedAt' | 'accessCount'>) {
  const client = getRedisClient();
  const existing = await getSite(siteName);
  const timestamps = {
    createdAt: existing?.createdAt ?? Date.now(),
    updatedAt: Date.now(),
    accessCount: existing ? (existing.accessCount ?? 0) + 1 : 1,
  };

  const toSave: StoredSite = {
    ...payload,
    ...timestamps,
  };

  await client.set(`site:${siteName}`, JSON.stringify(toSave));
  await client.lpush(`versions:${siteName}`, JSON.stringify({ ...payload, timestamp: timestamps.updatedAt }));
  await client.ltrim(`versions:${siteName}`, 0, 9); // keep 10 versions
  return toSave;
}

export async function getVersions(siteName: string) {
  const client = getRedisClient();
  const versions = await client.lrange(`versions:${siteName}`, 0, 9);
  return versions.map((entry) => JSON.parse(entry));
}

export async function deleteSite(siteName: string) {
  const client = getRedisClient();
  await client.del(`site:${siteName}`);
  await client.del(`versions:${siteName}`);
}
