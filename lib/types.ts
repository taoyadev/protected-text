// Version history entry
export interface Version {
  encrypted: string;
  iv: string;
  salt: string;
  timestamp: number;
  version: number;
  size: number;
}

// Encrypted payload for storing/retrieving notes
export interface EncryptedPayload {
  encrypted: string;
  iv: string;
  salt: string;
  version: number;
}

// Site metadata stored in Redis
export interface StoredSite {
  encrypted: string;
  iv: string;
  salt: string;
  version: number;
  createdAt: number;
  updatedAt: number;
  size: number;
  accessCount: number;
}

// Tab for multi-tab editor
export interface Tab {
  id: string;
  siteName: string;
  title: string;
}

// Password strength indicator
export interface PasswordScore {
  score: number;
  label: string;
  color: string;
}
