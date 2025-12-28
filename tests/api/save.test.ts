import { describe, expect, it, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/save/route';

// Mock dependencies
vi.mock('@/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockResolvedValue({ success: true, remaining: 59 }),
  getClientIP: vi.fn().mockReturnValue('127.0.0.1'),
}));

vi.mock('@/lib/storage', () => ({
  saveSite: vi.fn().mockResolvedValue({
    encrypted: 'test',
    iv: 'test',
    salt: 'test',
    version: 1,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    size: 100,
    accessCount: 1,
  }),
}));

import { rateLimit, getClientIP } from '@/lib/rate-limit';
import { saveSite } from '@/lib/storage';

describe('POST /api/save', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(getClientIP).mockReturnValue('127.0.0.1');
    vi.mocked(rateLimit).mockResolvedValue({ success: true, remaining: 59 });
  });

  const createRequest = (body: unknown) => {
    return new Request('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-forwarded-for': '127.0.0.1',
      },
      body: JSON.stringify(body),
    });
  };

  describe('successful saves', () => {
    it('saves a valid payload and returns ok', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'base64encrypteddata',
        iv: 'base64iv',
        salt: 'base64salt',
        version: 1,
        size: 100,
      };

      const response = await POST(createRequest(body));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toEqual({ ok: true });
      expect(saveSite).toHaveBeenCalledWith('test-note', {
        encrypted: 'base64encrypteddata',
        iv: 'base64iv',
        salt: 'base64salt',
        version: 1,
        size: 100,
      });
    });

    it('uses default version 1 if not provided', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 50,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(200);
      expect(saveSite).toHaveBeenCalledWith(
        'test-note',
        expect.objectContaining({ version: 1 }),
      );
    });
  });

  describe('validation errors', () => {
    it('rejects missing siteName', async () => {
      const body = {
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Invalid payload');
    });

    it('rejects siteName too short', async () => {
      const body = {
        siteName: 'ab',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects siteName too long', async () => {
      const body = {
        siteName: 'a'.repeat(33),
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects invalid siteName characters', async () => {
      const body = {
        siteName: 'Test_Note!',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects empty encrypted field', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: '',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects missing iv field', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects missing salt field', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects size exceeding limit (500KB)', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 500001,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects negative size', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: -1,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });

    it('rejects invalid version number', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        version: 0,
        size: 100,
      };

      const response = await POST(createRequest(body));

      expect(response.status).toBe(400);
    });
  });

  describe('rate limiting', () => {
    it('returns 429 when rate limited', async () => {
      vi.mocked(rateLimit).mockResolvedValueOnce({
        success: false,
        remaining: 0,
      });

      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const response = await POST(createRequest(body));
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.message).toBe('Too many requests');
    });

    it('uses save: prefix for rate limit identifier', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      await POST(createRequest(body));

      expect(rateLimit).toHaveBeenCalledWith('save:127.0.0.1');
    });

    it('calls getClientIP with request', async () => {
      const body = {
        siteName: 'test-note',
        encrypted: 'data',
        iv: 'iv',
        salt: 'salt',
        size: 100,
      };

      const request = createRequest(body);
      await POST(request);

      expect(getClientIP).toHaveBeenCalled();
    });
  });
});
