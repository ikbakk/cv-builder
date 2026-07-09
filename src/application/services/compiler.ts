import { $typst } from '@myriaddreamin/typst.ts';
import type { EditorStatus } from '../../domain/types';

type StatusCallback = (status: EditorStatus, error?: string) => void;

let initialized = false;

export async function initTypst(): Promise<void> {
  if (initialized) return;

  $typst.setCompilerInitOptions({
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm',
  });

  $typst.setRendererInitOptions({
    getModule: () =>
      'https://cdn.jsdelivr.net/npm/@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm',
  });

  initialized = true;
}

/**
 * Compile Typst source to PDF bytes.
 */
export async function compileToPdf(
  source: string,
  onStatus?: StatusCallback
): Promise<Uint8Array> {
  try {
    onStatus?.('compiling');
    const data = await $typst.pdf({ mainContent: source });
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

/**
 * Compile Typst source to SVG for preview.
 */
export async function compileToSvg(
  source: string,
  onStatus?: StatusCallback
): Promise<string> {
  try {
    onStatus?.('compiling');
    const svg = await $typst.svg({ mainContent: source });
    onStatus?.('ready');
    return svg;
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown compilation error';
    onStatus?.('error', message);
    throw err;
  }
}
