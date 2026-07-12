import { useEffect } from 'react';
import { ProfileSection } from '../components/organisms/ProfileSection';
import { SummarySection } from '../components/organisms/SummarySection';
import { ExperienceSection } from '../components/organisms/ExperienceSection';
import { SkillsSection } from '../components/organisms/SkillsSection';
import { EducationSection } from '../components/organisms/EducationSection';
import { AdditionalSection } from '../components/organisms/AdditionalSection';
import { TemplateSelector } from '../components/organisms/TemplateSelector';
import { PreviewPanel } from '../components/organisms/PreviewPanel';
import { useResumeStore } from '../application/store';
import { loadResumeData, loadTemplateId, loadCustomTemplate } from '../infrastructure/storage';

export function EditorPage() {
  const setData = useResumeStore((s) => s.setData);
  const setTemplate = useResumeStore((s) => s.setTemplate);
  const setCustomTemplate = useResumeStore((s) => s.setCustomTemplate);

  useEffect(() => {
    (async () => {
      const saved = await loadResumeData();
      if (saved) setData(saved);
      const tpl = await loadTemplateId();
      if (tpl) setTemplate(tpl);
      const custom = await loadCustomTemplate();
      if (custom) setCustomTemplate(custom);
    })();
  }, [setData, setTemplate, setCustomTemplate]);

  return (
    <div className="flex h-screen bg-surface text-text-primary">
      {/* Left: Form Editor */}
      <div className="flex w-[480px] min-w-[480px] flex-col overflow-hidden border-r border-border">
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h1 className="text-base font-semibold tracking-tight">CV Builder</h1>
          <TemplateSelector />
        </header>
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="flex flex-col gap-6">
            <ProfileSection />
            <SummarySection />
            <ExperienceSection />
            <SkillsSection />
            <EducationSection />
            <AdditionalSection />
          </div>
        </div>
      </div>

      {/* Right: Preview */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
