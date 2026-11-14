import { Input } from '../atoms/Input';
import { useResumeStore } from '../../application/store';

export function EducationSection() {
  const education = useResumeStore((s) => s.data.education);
  const updateEducation = useResumeStore((s) => s.updateEducation);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-text-primary">Education</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input label="Degree" value={education.degree} onChange={(e) => updateEducation({ degree: e.target.value })} />
        <Input label="Period" value={education.period} onChange={(e) => updateEducation({ period: e.target.value })} />
        <Input label="Institution" value={education.institution} onChange={(e) => updateEducation({ institution: e.target.value })} />
        <Input label="Location" value={education.location} onChange={(e) => updateEducation({ location: e.target.value })} />
      </div>
    </section>
  );
}
