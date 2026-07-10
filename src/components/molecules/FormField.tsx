import type { ReactNode } from 'react';
import { Label } from '../atoms/Label';

interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
}

export function FormField({ label, required, error, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label required={required}>{label}</Label>
      {children}
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  );
}
