import { BulletList } from '../molecules/BulletList';
import { useResumeStore } from '../../application/store';

export function AdditionalSection() {
  const additional = useResumeStore((s) => s.data.additional);
  const updateAdditional = useResumeStore((s) => s.updateAdditional);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text-primary">Additional Information</h2>
      <BulletList
        items={additional}
        onChange={updateAdditional}
        placeholder="e.g. Open to relocation..."
      />
    </section>
  );
}
