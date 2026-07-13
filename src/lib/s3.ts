// Utilities for the backend's S3 presigned-URL endpoints.
//
// The OpenAPI spec is thin — `POST /api/s3/presigned-url/upload` accepts
// a JSON string body and returns 201, and the download endpoints return a
// presigned URL. The exact response shape isn't fully documented, so the
// helpers below try the most likely keys (`url` / `uploadUrl` / raw string)
// and fall back gracefully. If the backend contract turns out to be
// different, adjust the small `pickUrl` / `pickKey` helpers here in one place.

import { landingApiUrl } from '@/constants';

const API_BASE = landingApiUrl;

function pickUrl(payload: unknown): string {
  if (!payload) throw new Error('S3 response was empty');
  if (typeof payload === 'string') return payload;
  if (typeof payload === 'object') {
    const p = payload as Record<string, unknown>;
    const candidates = [p.uploadUrl, p.url, p.presignedUrl, p.downloadUrl];
    for (const c of candidates) {
      if (typeof c === 'string' && c.length > 0) return c;
    }
  }
  throw new Error('S3 response did not contain a URL');
}

function pickKey(payload: unknown, fallback: string): string {
  if (typeof payload === 'object' && payload !== null) {
    const p = payload as Record<string, unknown>;
    const candidates = [p.key, p.id, p.fileId, p.objectKey];
    for (const c of candidates) {
      if (typeof c === 'string' && c.length > 0) return c;
    }
  }
  return fallback;
}

export interface UploadedFile {
  key: string;
  url: string;
}

/**
 * Upload a file via the backend's presigned URL flow.
 *
 * 1. POST /api/s3/presigned-url/upload with the file's content type
 * 2. PUT the file's bytes at the presigned URL
 * 3. Return the key the backend assigned + the public/canonical URL
 */
export async function uploadFileViaS3(file: File): Promise<UploadedFile> {
  // The backend crashes with `Cannot read properties of undefined (reading
  // 'title')` regardless of whether `title` is at the top level. That means
  // the backend destructures from a NESTED container (something like
  // `body.file.title` or `body.item.title`). Until the exact DTO is
  // documented, we mirror the same fields into every likely container so
  // whichever one the backend accesses, `.title` is defined.
  const inner = {
    title: file.name,
    name: file.name,
    fileName: file.name,
    contentType: file.type || 'application/octet-stream',
    mimeType: file.type || 'application/octet-stream',
    size: file.size,
  };
  const requestBody = {
    ...inner,
    file: inner,
    item: inner,
    data: inner,
    metadata: inner,
    body: inner,
  };
  console.log('[S3] upload → POST /api/s3/presigned-url/upload', {
    request: requestBody,
    file: { name: file.name, type: file.type, size: file.size },
  });

  const presignRes = await fetch(`${API_BASE}/api/s3/presigned-url/upload`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody),
  });

  const rawText = await presignRes.text().catch(() => '');
  console.log('[S3] upload response', {
    status: presignRes.status,
    ok: presignRes.ok,
    contentType: presignRes.headers.get('content-type'),
    body: rawText,
  });

  if (!presignRes.ok) {
    console.error('presigned-url/upload failed', presignRes.status, rawText);
    throw new Error('Failed to get an upload URL');
  }

  let presignData: unknown = null;
  try {
    presignData = rawText ? JSON.parse(rawText) : null;
  } catch {
    presignData = rawText;
  }
  console.log('[S3] parsed presign data', presignData);

  const uploadUrl = pickUrl(presignData);
  const key = pickKey(presignData, file.name);
  console.log('[S3] resolved', { uploadUrl, key });

  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': file.type || 'application/octet-stream' },
    body: file,
  });

  if (!uploadRes.ok) {
    const text = await uploadRes.text().catch(() => '');
    console.error('S3 PUT failed', uploadRes.status, text);
    throw new Error('Failed to upload file');
  }

  // Strip query params to get the canonical object URL (best guess).
  const canonicalUrl = uploadUrl.split('?')[0];
  return { key, url: canonicalUrl };
}

/**
 * Resolve a stored resume / file identifier to a browsable URL.
 *
 * If the input is already a full URL, return it directly.
 * Otherwise, treat it as an ID and ask the backend for a presigned
 * download URL.
 */
export async function resolveDownloadUrl(idOrUrl: string): Promise<string> {
  if (/^https?:\/\//i.test(idOrUrl)) return idOrUrl;

  const res = await fetch(
    `${API_BASE}/api/s3/presigned-url/download/${encodeURIComponent(idOrUrl)}`,
    { method: 'GET' },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('presigned-url/download failed', res.status, text);
    throw new Error('Failed to resolve download URL');
  }

  const contentType = res.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => null);
    return pickUrl(data);
  }
  const text = await res.text();
  return text.trim().replace(/^"|"$/g, '');
}
