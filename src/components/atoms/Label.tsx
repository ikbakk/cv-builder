import type { LabelHTMLAttributes } from 'react';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export function Label({ required, children, className = '', ...props }: LabelProps) {
  return (
    <label className={`text-xs font-medium text-text-secondary ${className}`} {...props}>
      {children}
      {required && <span className="ml-0.5 text-red-400">*</span>}
    </label>
  );
}
