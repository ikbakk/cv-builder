import { Input } from '../atoms/Input';
import { Textarea } from '../atoms/Textarea';
import { Button } from '../atoms/Button';
import { EntryCard } from '../molecules/EntryCard';
import { BulletList } from '../molecules/BulletList';
import { useResumeStore } from '../../application/store';

export function ExperienceSection() {
  const experiences = useResumeStore((s) => s.data.experiences);
  const updateExperience = useResumeStore((s) => s.updateExperience);
  const addExperience = useResumeStore((s) => s.addExperience);
  const removeExperience = useResumeStore((s) => s.removeExperience);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Experience</h2>
        <Button variant="secondary" size="sm" onClick={addExperience}>
          + Add
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {experiences.length === 0 && <p className="text-sm text-text-secondary">No experience added yet. Use Add to start this section.</p>}
        {experiences.map((exp, i) => (
          <EntryCard
            key={i}
            title={exp.title || exp.company ? `${exp.title} @ ${exp.company}` : 'New experience'}
            onRemove={() => removeExperience(i)}
          >
            <Input
              label="Title"
              value={exp.title}
              onChange={(e) => updateExperience(i, { title: e.target.value })}
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={(e) => updateExperience(i, { company: e.target.value })}
            />
            <Input
              label="Period"
              value={exp.period}
              placeholder="Jan 2020 – Present"
              onChange={(e) => updateExperience(i, { period: e.target.value })}
            />
            <Input
              label="Tech Stack"
              value={exp.tech}
              placeholder="React • TypeScript • Node.js"
              onChange={(e) => updateExperience(i, { tech: e.target.value })}
            />
            <Textarea
              label="Intro"
              value={exp.intro}
              onChange={(e) => updateExperience(i, { intro: e.target.value })}
            />
            <div className="flex flex-col gap-1.5">
              <span className="text-xs font-medium text-text-secondary">Bullets</span>
              <BulletList
                items={exp.bullets}
                onChange={(bullets) => updateExperience(i, { bullets })}
                placeholder="Describe a responsibility or achievement..."
              />
            </div>
          </EntryCard>
        ))}
      </div>
    </section>
  );
}
