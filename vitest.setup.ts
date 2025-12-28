import '@testing-library/jest-dom/vitest';
import { webcrypto } from 'node:crypto';

// Polyfill Web Crypto API for Node.js environment
if (typeof globalThis.crypto === 'undefined') {
  globalThis.crypto = webcrypto as Crypto;
}
