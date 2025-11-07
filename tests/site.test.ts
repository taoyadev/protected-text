import { describe, expect, it } from 'vitest';
import { normalizeSiteName, isSiteNameValid } from '@/lib/site';

describe('site helpers', () => {
  it('normalizes input by trimming, lowercasing and removing invalid chars', () => {
    expect(normalizeSiteName('  My Secure Note!!!  ')).toBe('my-secure-note');
  });

  it('validates slug constraints', () => {
    expect(isSiteNameValid('abc')).toBe(true);
    expect(isSiteNameValid('A')).toBe(false);
    expect(isSiteNameValid('this-slug-is-way-too-long-for-the-system-and-should-fail')).toBe(false);
  });
});
