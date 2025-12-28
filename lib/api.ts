import type { EncryptedPayload } from '@/lib/crypto';

export type SavePayload = EncryptedPayload & {
  siteName: string;
  size: number;
};

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || 'Unexpected server error');
  }
  return response.json().catch(() => ({}));
}

export async function saveEncryptedNote(payload: SavePayload) {
  const response = await fetch('/api/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return handleResponse(response);
}

export async function loadEncryptedNote(siteName: string) {
  const response = await fetch('/api/load', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteName }),
  });
  return handleResponse(response) as Promise<{
    payload: EncryptedPayload | null;
    updatedAt?: number;
  }>;
}

export async function checkSiteExists(siteName: string) {
  const response = await fetch(
    `/api/check?site=${encodeURIComponent(siteName)}`,
  );
  return handleResponse(response) as Promise<{
    exists: boolean;
    updatedAt?: number;
  }>;
}

export async function deleteNote(siteName: string) {
  const response = await fetch('/api/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ siteName }),
  });
  return handleResponse(response);
}
