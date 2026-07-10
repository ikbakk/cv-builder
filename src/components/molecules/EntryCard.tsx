import type { ReactNode } from 'react';
import { IconButton } from '../atoms/IconButton';

interface EntryCardProps {
  title: string;
  onRemove?: () => void;
  children: ReactNode;
}

function ChevronIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6" />
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

export function EntryCard({ title, onRemove, children }: EntryCardProps) {
  return (
    <details className="group rounded-lg border border-border bg-surface-alt/50 open:bg-surface">
      <summary className="flex cursor-pointer items-center justify-between px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-alt rounded-lg [&::-webkit-details-marker]:hidden">
        <span className="truncate">{title || 'New entry'}</span>
        <div className="flex items-center gap-1">
          {onRemove && (
            <IconButton label="Remove entry" onClick={(e) => { e.stopPropagation(); onRemove(); }}>
              <TrashIcon />
            </IconButton>
          )}
          <ChevronIcon />
        </div>
      </summary>
      <div className="border-t border-border p-3 flex flex-col gap-3">
        {children}
      </div>
    </details>
  );
}
