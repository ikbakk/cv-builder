import { useRef } from 'react';
import { Select } from '../atoms/Select';
import { Button } from '../atoms/Button';
import { useResumeStore } from '../../application/store';
import { loadCustomTemplate } from '../../infrastructure/storage';
import type { TemplateId, CustomTemplate } from '../../domain/types';

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

const builtInOptions = [
  { value: 'ats', label: 'ATS Friendly' },
  { value: 'professional', label: 'Professional' },
];

export function TemplateSelector() {
  const template = useResumeStore((s) => s.template);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const customTemplate = useResumeStore((s) => s.customTemplate);
  const setCustomTemplate = useResumeStore((s) => s.setCustomTemplate);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const options = [
    ...builtInOptions,
    ...(customTemplate
      ? [{ value: 'custom' as const, label: `Custom: ${customTemplate.name}` }]
      : [{ value: 'custom' as const, label: 'Custom (upload)' }]),
  ];

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const content = await file.text();
    const name = file.name.replace(/\.typ$/, '');
    const tmpl: CustomTemplate = { name, content };
    setCustomTemplate(tmpl);
    setTemplate('custom');
    // reset input so same file can be re-uploaded
    e.target.value = '';
  };

  const handleClear = () => {
    setCustomTemplate(null);
    setTemplate('ats');
  };

  return (
    <div className="flex items-center gap-2">
      <Select
        label="Template"
        options={options}
        value={template}
        onChange={(e) => setTemplate(e.target.value as TemplateId)}
        className="w-40"
      />
      <input
        ref={fileInputRef}
        type="file"
        accept=".typ"
        className="hidden"
        onChange={handleUpload}
      />
      <Button
        variant="secondary"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
        title="Upload custom .typ template"
      >
        <UploadIcon />
        Upload
      </Button>
      {template === 'custom' && customTemplate && (
        <Button variant="ghost" size="sm" onClick={handleClear} title="Remove custom template">
          <TrashIcon />
        </Button>
      )}
    </div>
  );
}
