import { useState, useCallback } from 'react';
import { Button } from '../atoms/Button';
import { useResumeStore } from '../../application/store';
import { initTypst, compileToPdf, compileToSvg } from '../../application/services/compiler';
import { assembleTypstSource } from '../../application/services/template-engine';
import type { EditorStatus } from '../../domain/types';

function DownloadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function templateLabel(template: string, customName?: string): string {
  if (template === 'custom' && customName) return customName;
  if (template === 'ats') return 'ATS';
  if (template === 'professional') return 'Professional';
  return 'Resume';
}

function downloadPdf(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function PreviewPanel() {
  const data = useResumeStore((s) => s.data);
  const template = useResumeStore((s) => s.template);
  const profile = useResumeStore((s) => s.data.profile);
  const customTemplate = useResumeStore((s) => s.customTemplate);
  const [status, setStatus] = useState<EditorStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [svgPreview, setSvgPreview] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    try {
      setError(null);
      setSvgPreview(null);
      setStatus('compiling');

      await initTypst();

      const source = await assembleTypstSource(
        data,
        template,
        template === 'custom' ? customTemplate?.content : undefined
      );

      // Compile to SVG for preview
      const svg = await compileToSvg(source, setStatus);
      setSvgPreview(svg);

      // Compile to PDF for download
      const pdf = await compileToPdf(source, setStatus);
      const label = templateLabel(template, customTemplate?.name);
      const safeName = profile.name.replace(/\s+/g, '_');
      downloadPdf(pdf, `${safeName}_Resume_${label}.pdf`);

      setStatus('ready');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong';
      setError(msg);
      setStatus('error');
    }
  }, [data, template, profile.name, customTemplate]);

  const isLoading = status === 'compiling';

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Preview</h2>
        <Button onClick={handleGenerate} loading={isLoading}>
          <DownloadIcon />
          {isLoading ? 'Generating...' : 'Generate PDF'}
        </Button>
      </div>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="flex-1 overflow-auto rounded-lg border border-border bg-white">
        {svgPreview ? (
          <div
            className="mx-auto"
            style={{ maxWidth: '100%' }}
            dangerouslySetInnerHTML={{ __html: svgPreview }}
          />
        ) : (
          <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-text-secondary">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Compiling...
              </div>
            ) : (
              'Click "Generate PDF" to preview your resume'
            )}
          </div>
        )}
      </div>
    </div>
  );
}
