import { Textarea } from '../atoms/Textarea';
import { useResumeStore } from '../../application/store';

export function SummarySection() {
  const summary = useResumeStore((s) => s.data.summary);
  const updateSummary = useResumeStore((s) => s.updateSummary);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text-primary">Professional Summary</h2>
      <Textarea
        value={summary}
        onChange={(e) => updateSummary(e.target.value)}
        placeholder="Professional summary..."
        className="min-h-[100px]"
      />
    </section>
  );
}
