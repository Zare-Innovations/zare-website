// Utilities for the backend's S3 file endpoints.
//
// Backend contract (per landing.zareinnovations.com/docs, S3 tag):
//   POST /api/s3/upload             multipart form: file, itemId, type, (key?)
//   GET  /api/s3/download/{id}      streams the file (or JSON envelope with url)
//   GET  /api/s3/documents/{type}/{key}/{itemId}   lists docs for an entity
//
// The upload endpoint uploads to S3 server-side and returns a Document row we
// key on `id`. Downloads stream the raw bytes; we wrap them in an object URL
// for browser open/preview.

import { landingApiUrl } from '@/constants';

const API_BASE = landingApiUrl;

export interface UploadedFile {
  /** Document id — pass to `downloadFileAsObjectUrl` or store as the resume reference. */
  id: string;
  /** Backend-assigned S3 key (present if the response includes it). */
  key?: string;
  /** Original filename echoed back by the backend. */
  title?: string;
}

/**
 * Upload a file to the backend's S3 store. All three of `file`, `itemId`, and
 * `type` are required by the backend; `key` is optional grouping metadata.
 */
export async function uploadFileViaS3(
  file: File,
  opts: { type: string; itemId: string; key?: string },
): Promise<UploadedFile> {
  const body = new FormData();
  body.append('file', file);
  body.append('itemId', opts.itemId);
  body.append('type', opts.type);
  if (opts.key) body.append('key', opts.key);

  console.log('[S3] upload → POST /api/s3/upload', {
    file: { name: file.name, type: file.type, size: file.size },
    itemId: opts.itemId,
    type: opts.type,
    key: opts.key,
  });

  const res = await fetch(`${API_BASE}/api/s3/upload`, {
    method: 'POST',
    body,
  });

  const rawText = await res.text().catch(() => '');
  console.log('[S3] upload response', {
    status: res.status,
    ok: res.ok,
    body: rawText,
  });

  if (!res.ok) {
    console.error('s3/upload failed', res.status, rawText);
    throw new Error('Failed to upload file');
  }

  let data: unknown = null;
  try {
    data = rawText ? JSON.parse(rawText) : null;
  } catch {
    data = rawText;
  }
  console.log('[S3] parsed upload data', data);

  if (!data || typeof data !== 'object') {
    throw new Error('Upload response did not include a document id');
  }
  const rec = data as Record<string, unknown>;
  const id = pickString(rec, ['id', 'documentId', 'fileId']);
  if (!id) throw new Error('Upload response missing id');

  return {
    id,
    key: pickString(rec, ['key', 'objectKey']),
    title: pickString(rec, ['title', 'originalname', 'fileName']),
  };
}

/**
 * Download the file identified by a document id and return a browsable
 * object URL. Caller is responsible for revoking the URL once done.
 */
export async function downloadFileAsObjectUrl(
  documentId: string,
): Promise<string> {
  const res = await fetch(
    `${API_BASE}/api/s3/download/${encodeURIComponent(documentId)}`,
    { method: 'GET' },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('s3/download failed', res.status, text);
    throw new Error('Failed to download file');
  }

  const contentType = res.headers.get('content-type') ?? '';
  // Some backends return a JSON envelope with a redirect URL; support both.
  if (contentType.includes('application/json')) {
    const data = await res.json().catch(() => null);
    const url = pickString(data as Record<string, unknown> | null, [
      'url',
      'downloadUrl',
      'presignedUrl',
    ]);
    if (url) return url;
    throw new Error('Download response missing url');
  }

  const blob = await res.blob();
  return URL.createObjectURL(blob);
}

/**
 * List documents attached to a given entity (type + key + itemId tuple).
 * Useful for admin UIs that browse an item's attached files.
 */
export async function listDocumentsFor(
  type: string,
  key: string,
  itemId: string,
): Promise<unknown> {
  const res = await fetch(
    `${API_BASE}/api/s3/documents/${encodeURIComponent(type)}/${encodeURIComponent(key)}/${encodeURIComponent(itemId)}`,
    { method: 'GET' },
  );
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('s3/documents failed', res.status, text);
    throw new Error('Failed to list documents');
  }
  return res.json().catch(() => null);
}

function pickString(
  obj: Record<string, unknown> | null | undefined,
  keys: string[],
): string | undefined {
  if (!obj) return undefined;
  for (const k of keys) {
    const v = obj[k];
    if (typeof v === 'string' && v.length > 0) return v;
  }
  return undefined;
}
