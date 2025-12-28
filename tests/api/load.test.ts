import { describe, expect, it, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/load/route';

// Mock dependencies
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue({ success: true, remaining: 59 }),
  getClientIP: vi.fn().mockReturnValue('127.0.0.1'),
}));

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

vi.mock('@/lib/storage', () => ({
  getSite: vi.fn().mockResolvedValue(null),
}));

import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { getSite } from '@/lib/storage';

describe('POST /api/load', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1');
    vi.mocked(rateLimit).mockResolvedValue({ success: true, remaining: 59 });
  });

  const createRequest = (body: unknown) => {
    return new Request('http://localhost:3000/api/load', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify(body),
    });
  };

  describe('successful loads', () => {
    it('returns payload when site exists', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await POST(createRequest({ siteName: 'test-note' }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.payload).toEqual({
        encrypted: 'encryptedData',
        iv: 'testIv',
        salt: 'testSalt',
        version: 1,
      });
      expect(data.updatedAt).toBe(1700000001000);
    });

    it('returns null payload when site does not exist', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(null);

      const response = await POST(createRequest({ siteName: 'nonexistent' }));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.payload).toBeNull();
    });

    it('calls getSite with correct siteName', async () => {
      await POST(createRequest({ siteName: 'my-note' }));

      expect(getSite).toHaveBeenCalledWith('my-note');
    });
  });

  describe('validation errors', () => {
    it('rejects missing siteName', async () => {
      const response = await POST(createRequest({}));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Invalid payload');
    });

    it('rejects siteName too short', async () => {
      const response = await POST(createRequest({ siteName: 'ab' }));

      expect(response.status).toBe(400);
    });

    it('rejects siteName too long', async () => {
      const response = await POST(createRequest({ siteName: 'a'.repeat(33) }));

      expect(response.status).toBe(400);
    });

    it('rejects invalid siteName characters', async () => {
      const response = await POST(createRequest({ siteName: 'Test_Note!' }));

      expect(response.status).toBe(400);
    });

    it('rejects uppercase in siteName', async () => {
      const response = await POST(createRequest({ siteName: 'TestNote' }));

      expect(response.status).toBe(400);
    });

    it('rejects siteName with spaces', async () => {
      const response = await POST(createRequest({ siteName: 'test note' }));

      expect(response.status).toBe(400);
    });
  });

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      vi.mocked(rateLimit).mockResolvedValueOnce({
        success: false,
        remaining: 0,
      });

      const response = await POST(createRequest({ siteName: 'test-note' }));
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.message).toBe('Too many requests');
    });

    it('uses load: prefix for rate limit identifier', async () => {
      await POST(createRequest({ siteName: 'test-note' }));

      expect(rateLimit).toHaveBeenCalledWith('load:127.0.0.1');
    });

    it('calls getClientIP with request', async () => {
      const request = createRequest({ siteName: 'test-note' });
      await POST(request);

      expect(getClientIP).toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('handles 3-character siteName (minimum)', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await POST(createRequest({ siteName: 'abc' }));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('abc');
    });

    it('handles 32-character siteName (maximum)', async () => {
      const siteName = 'a'.repeat(32);
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await POST(createRequest({ siteName }));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith(siteName);
    });

    it('handles siteName with hyphens', async () => {
      vi.mocked(getSite).mockResolvedValueOnce(mockSite);

      const response = await POST(createRequest({ siteName: 'my-test-note' }));

      expect(response.status).toBe(200);
      expect(getSite).toHaveBeenCalledWith('my-test-note');
    });
  });
});
