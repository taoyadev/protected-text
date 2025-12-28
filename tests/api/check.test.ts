import { describe, expect, it, vi, beforeEach } from 'vitest';

// Create reusable mock factories
const createSuccessfulRedisMock = () => ({
  multi: vi.fn().mockReturnValue({
    incr: vi.fn().mockReturnThis(),
    expire: vi.fn().mockReturnThis(),
    exec: vi.fn().mockResolvedValue([
      [null, 1],
      [null, true],
    ]),
  }),
});

// Mock dependencies - must be before imports
vi.mock('@/lib/redis', () => ({
  getRedisClient: vi.fn(),
}));

vi.mock('@/lib/storage', () => ({
  getSite: vi.fn().mockResolvedValue(null),
}));

import { GET } from '@/app/api/check/route';
import { getSite } from '@/lib/storage';
import { getRedisClient } from '@/lib/redis';

const mockSite = {
  encrypted: 'encryptedData',
  iv: 'testIv',
  salt: 'testSalt',
  version: 1,
  createdAt: 1700000000000,
  updatedAt: 1700000001000,
  size: 100,
  accessCount: 5,
};

describe('GET /api/check', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset Redis mock to successful state before each test
    vi.mocked(getRedisClient).mockReturnValue(
      createSuccessfulRedisMock() as unknown as ReturnType<
        typeof getRedisClient
      >,
    );
  });

  const createRequest = (site: string) => {
    return new Request(`http://localhost:3000/api/check?site=${site}`, {
      method: 'GET',
      headers: {
        'x-forwarded-for': '127.0.0.1',
      },
    });
  };

  describe('successful checks', () => {
    it('returns exists: true when site exists', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(createRequest('test-note'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.exists).toBe(true);
      expect(data.updatedAt).toBe(1700000001000);
    });

    it('returns exists: false when site does not exist', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(null);

      const response = await GET(createRequest('nonexistent'));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.exists).toBe(false);
      expect(data.updatedAt).toBeUndefined();
    });

    it('calls getSite with correct siteName', async () => {
      await GET(createRequest('my-note'));

      expect(getSite).toHaveBeenCalledWith('my-note');
    });
  });

  describe('validation errors', () => {
    it('rejects missing site parameter', async () => {
      const request = new Request('http://localhost:3000/api/check', {
        method: 'GET',
        headers: { 'x-forwarded-for': '127.0.0.1' },
      });

      const response = await GET(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Invalid site');
    });

    it('rejects empty site parameter', async () => {
      const response = await GET(createRequest(''));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Invalid site');
    });

    it('rejects site too short', async () => {
      const response = await GET(createRequest('ab'));

      expect(response.status).toBe(400);
    });

    it('rejects site too long', async () => {
      const response = await GET(createRequest('a'.repeat(33)));

      expect(response.status).toBe(400);
    });

    it('rejects invalid site characters', async () => {
      const response = await GET(createRequest('Test_Note!'));

      expect(response.status).toBe(400);
    });

    it('rejects uppercase in site', async () => {
      const response = await GET(createRequest('TestNote'));

      expect(response.status).toBe(400);
    });

    it('rejects site with spaces (URL encoded)', async () => {
      const request = new Request(
        `http://localhost:3000/api/check?site=${encodeURIComponent('test note')}`,
        {
          method: 'GET',
          headers: { 'x-forwarded-for': '127.0.0.1' },
        },
      );

      const response = await GET(request);

      expect(response.status).toBe(400);
    });
  });

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      // Override mock to simulate rate limiting (count over 60)
      vi.mocked(getRedisClient).mockReturnValue({
        multi: vi.fn().mockReturnValue({
          incr: vi.fn().mockReturnThis(),
          expire: vi.fn().mockReturnThis(),
          exec: vi.fn().mockResolvedValue([
            [null, 100], // Over limit of 60
            [null, true],
          ]),
        }),
      } as unknown as ReturnType<typeof getRedisClient>);

      const response = await GET(createRequest('test-note'));
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.message).toBe('Too many requests');
    });
  });

  describe('edge cases', () => {
    it('handles 3-character site (minimum)', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(createRequest('abc'));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('abc');
    });

    it('handles 32-character site (maximum)', async () => {
      const site = 'a'.repeat(32);
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(createRequest(site));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith(site);
    });

    it('handles site with hyphens', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(createRequest('my-test-note'));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('my-test-note');
    });

    it('handles site starting with number', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(createRequest('123-note'));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('123-note');
    });

    it('handles multiple query parameters', async () => {
      const request = new Request(
        'http://localhost:3000/api/check?site=test-note&extra=param',
        {
          method: 'GET',
          headers: { 'x-forwarded-for': '127.0.0.1' },
        },
      );
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('test-note');
    });
  });
});
