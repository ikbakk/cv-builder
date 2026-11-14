import { Input } from '../atoms/Input';
import { IconButton } from '../atoms/IconButton';
import { Button } from '../atoms/Button';
import { useResumeStore } from '../../application/store';

function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
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

export function SkillsSection() {
  const skills = useResumeStore((s) => s.data.skills);
  const updateSkill = useResumeStore((s) => s.updateSkill);
  const addSkill = useResumeStore((s) => s.addSkill);
  const removeSkill = useResumeStore((s) => s.removeSkill);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-text-primary">Skills</h2>
        <Button variant="secondary" size="sm" onClick={addSkill}>
          + Add
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        {skills.length === 0 && <p className="text-sm text-text-secondary">No skills added yet. Use Add to create a category.</p>}
        {skills.map((skill, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="grid grid-cols-1 flex-1 gap-2 sm:grid-cols-2">
              <Input
                value={skill.category}
                onChange={(e) => updateSkill(i, { category: e.target.value })}
                placeholder="Category (e.g. Frontend)"
              />
              <Input
                value={skill.skills}
                onChange={(e) => updateSkill(i, { skills: e.target.value })}
                placeholder="React • TypeScript • CSS"
              />
            </div>
            {skills.length > 1 && (
              <IconButton label="Remove skill" onClick={() => removeSkill(i)}>
                <TrashIcon />
              </IconButton>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
