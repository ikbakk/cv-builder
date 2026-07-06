import type { EditorStatus } from '../../domain/types';

type StatusCallback = (status: EditorStatus, error?: string) => void;

/**
 * Compile Typst source to PDF via the local dev server API
 * which runs the system `typst` CLI.
 */
export async function compileToPdf(
  source: string,
  onStatus?: StatusCallback
): Promise<Uint8Array> {
  try {
    onStatus?.('compiling');

    const res = await fetch('/api/compile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ source }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: res.statusText }));
      throw new Error(err.error || `Server returned ${res.status}`);
    }

    const buf = await res.arrayBuffer();
    const data = new Uint8Array(buf);

    if (!data || data.length === 0) {
      throw new Error('Compilation returned empty result');
    }

    onStatus?.('ready');
    return data;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown compilation error';
    onStatus?.('error', message);
    throw err;
  }
}
