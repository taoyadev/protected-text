import { describe, expect, it } from 'vitest';
import {
  encryptContent,
  decryptContent,
  generateSalt,
  arrayBufferToBase64,
  base64ToArrayBuffer,
} from '@/lib/crypto';

describe('crypto module', () => {
  describe('encryptContent/decryptContent round-trip', () => {
    it('encrypts and decrypts content correctly', async () => {
      const content = 'Hello, World!';
      const password = 'test-password-123';

      const payload = await encryptContent(content, password);
      const decrypted = await decryptContent(payload, password);

      expect(decrypted).toBe(content);
    });

    it('handles empty content', async () => {
      const content = '';
      const password = 'my-secret';

      const payload = await encryptContent(content, password);
      const decrypted = await decryptContent(payload, password);

      expect(decrypted).toBe(content);
    });

    it('handles unicode content', async () => {
      const content = 'Hello, World! Emoji: \u{1F600} \u{1F389} \u{1F680}';
      const password = 'unicode-test';

      const payload = await encryptContent(content, password);
      const decrypted = await decryptContent(payload, password);

      expect(decrypted).toBe(content);
    });

    it('handles large content', async () => {
      const content = 'x'.repeat(100000);
      const password = 'large-content-test';

      const payload = await encryptContent(content, password);
      const decrypted = await decryptContent(payload, password);

      expect(decrypted).toBe(content);
    });

    it('handles multi-line content', async () => {
      const content = 'Line 1\nLine 2\nLine 3\n\nLine 5';
      const password = 'multiline-test';

      const payload = await encryptContent(content, password);
      const decrypted = await decryptContent(payload, password);

      expect(decrypted).toBe(content);
    });
  });

  describe('wrong password handling', () => {
    it('throws an error when decrypting with wrong password', async () => {
      const content = 'Secret message';
      const correctPassword = 'correct-password';
      const wrongPassword = 'wrong-password';

      const payload = await encryptContent(content, correctPassword);

      await expect(decryptContent(payload, wrongPassword)).rejects.toThrow();
    });

    it('throws on empty password for decryption', async () => {
      const content = 'Secret message';
      const password = 'original-password';

      const payload = await encryptContent(content, password);

      await expect(decryptContent(payload, '')).rejects.toThrow();
    });
  });

  describe('salt and iv randomness', () => {
    it('generates different salts for each encryption', async () => {
      const content = 'Same content';
      const password = 'same-password';

      const payload1 = await encryptContent(content, password);
      const payload2 = await encryptContent(content, password);

      expect(payload1.salt).not.toBe(payload2.salt);
    });

    it('generates different ivs for each encryption', async () => {
      const content = 'Same content';
      const password = 'same-password';

      const payload1 = await encryptContent(content, password);
      const payload2 = await encryptContent(content, password);

      expect(payload1.iv).not.toBe(payload2.iv);
    });

    it('generates different encrypted data for same content', async () => {
      const content = 'Same content';
      const password = 'same-password';

      const payload1 = await encryptContent(content, password);
      const payload2 = await encryptContent(content, password);

      expect(payload1.encrypted).not.toBe(payload2.encrypted);
    });
  });

  describe('payload format validation', () => {
    it('returns payload with required fields', async () => {
      const content = 'Test content';
      const password = 'test-password';

      const payload = await encryptContent(content, password);

      expect(payload).toHaveProperty('encrypted');
      expect(payload).toHaveProperty('iv');
      expect(payload).toHaveProperty('salt');
      expect(payload).toHaveProperty('version');
    });

    it('returns payload with correct version', async () => {
      const content = 'Test content';
      const password = 'test-password';

      const payload = await encryptContent(content, password);

      expect(payload.version).toBe(1);
    });

    it('returns base64 encoded strings', async () => {
      const content = 'Test content';
      const password = 'test-password';

      const payload = await encryptContent(content, password);

      // Base64 regex pattern
      const base64Pattern = /^[A-Za-z0-9+/]+=*$/;

      expect(payload.encrypted).toMatch(base64Pattern);
      expect(payload.iv).toMatch(base64Pattern);
      expect(payload.salt).toMatch(base64Pattern);
    });

    it('iv has correct length (12 bytes = 16 base64 chars)', async () => {
      const content = 'Test content';
      const password = 'test-password';

      const payload = await encryptContent(content, password);

      // 12 bytes -> 16 base64 chars
      expect(payload.iv.length).toBe(16);
    });

    it('salt has correct length (16 bytes)', async () => {
      const content = 'Test content';
      const password = 'test-password';

      const payload = await encryptContent(content, password);

      // 16 bytes -> 24 base64 chars (with padding)
      expect(payload.salt.length).toBeGreaterThanOrEqual(22);
      expect(payload.salt.length).toBeLessThanOrEqual(24);
    });
  });

  describe('generateSalt', () => {
    it('generates salt with default size of 16 bytes', async () => {
      const salt = await generateSalt();

      expect(salt).toBeInstanceOf(Uint8Array);
      expect(salt.length).toBe(16);
    });

    it('generates salt with custom size', async () => {
      const salt = await generateSalt(32);

      expect(salt).toBeInstanceOf(Uint8Array);
      expect(salt.length).toBe(32);
    });

    it('generates unique salts on each call', async () => {
      const salt1 = await generateSalt();
      const salt2 = await generateSalt();

      expect(arrayBufferToBase64(salt1)).not.toBe(arrayBufferToBase64(salt2));
    });
  });

  describe('base64 encoding/decoding', () => {
    it('encodes and decodes ArrayBuffer correctly', () => {
      const original = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]);
      const encoded = arrayBufferToBase64(original);
      const decoded = base64ToArrayBuffer(encoded);

      expect(new Uint8Array(decoded)).toEqual(original);
    });

    it('handles empty buffer', () => {
      const original = new Uint8Array([]);
      const encoded = arrayBufferToBase64(original);
      const decoded = base64ToArrayBuffer(encoded);

      expect(new Uint8Array(decoded)).toEqual(original);
    });

    it('handles large buffer', () => {
      const original = new Uint8Array(1000).map((_, i) => i % 256);
      const encoded = arrayBufferToBase64(original);
      const decoded = base64ToArrayBuffer(encoded);

      expect(new Uint8Array(decoded)).toEqual(original);
    });
  });
});
