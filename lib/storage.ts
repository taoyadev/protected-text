import { getRedisClient } from './redis';
import type { StoredSite, Version } from './types';

export async function getSite(siteName: string): Promise<StoredSite | null> {
  const client = getRedisClient();
  const data = await client.get(`site:${siteName}`);
  if (!data) return null;
  return JSON.parse(data) as StoredSite;
}

export async function saveSite(
  siteName: string,
  payload: Omit<StoredSite, 'createdAt' | 'updatedAt' | 'accessCount'>,
): Promise<StoredSite> {
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
  await client.lpush(
    `versions:${siteName}`,
    JSON.stringify({ ...payload, timestamp: timestamps.updatedAt }),
  );
  await client.ltrim(`versions:${siteName}`, 0, 9); // keep 10 versions
  return toSave;
}

export async function getVersions(siteName: string): Promise<Version[]> {
  const client = getRedisClient();
  const versions = await client.lrange(`versions:${siteName}`, 0, 9);
  return versions.map((entry) => JSON.parse(entry) as Version);
}

export async function deleteSite(siteName: string): Promise<void> {
  const client = getRedisClient();
  await client.del(`site:${siteName}`);
  await client.del(`versions:${siteName}`);
}
