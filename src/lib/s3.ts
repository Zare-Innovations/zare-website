// Utilities for the backend's file storage endpoints.
//
// The backend's `POST /api/s3/presigned-url/upload` actually accepts a
// multipart FormData (title + description + file) and uploads to S3
// internally — no follow-up PUT to a presigned URL is needed. This matches
// the pattern used in the 251-Dashboard project the backend dev pointed us
// to. The endpoint returns a Document row we store by its `id`; downloads
// stream the file back as a Blob via `GET /api/s3/presigned-url/download/{id}`.

import { landingApiUrl } from '@/constants';

const API_BASE = landingApiUrl;

export interface UploadedFile {
  /** Document id — pass this to `resolveDownloadUrl` or store as the resume reference. */
  id: string;
  /** Backend-assigned S3 key (present if the response includes it). */
  key?: string;
  /** Original filename echoed back by the backend. */
  title?: string;
}

/**
 * Upload a file through the backend. The backend uploads to S3 internally
 * and returns a Document row.
 */
export async function uploadFileViaS3(
  file: File,
  opts?: { type?: string; itemId?: string; description?: string },
): Promise<UploadedFile> {
  const body = new FormData();
  body.append('title', file.name);
  body.append('description', opts?.description ?? file.name);
  body.append('file', file);
  if (opts?.type) body.append('type', opts.type);
  if (opts?.itemId) body.append('itemId', opts.itemId);

  console.log('[S3] upload → POST /api/s3/presigned-url/upload', {
    title: file.name,
    file: { name: file.name, type: file.type, size: file.size },
    ...(opts ?? {}),
  });

  const res = await fetch(`${API_BASE}/api/s3/presigned-url/upload`, {
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
    console.error('presigned-url/upload failed', res.status, rawText);
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
    `${API_BASE}/api/s3/presigned-url/download/${encodeURIComponent(documentId)}`,
    { method: 'GET' },
  );

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    console.error('presigned-url/download failed', res.status, text);
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
