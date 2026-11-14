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
    <div className="flex min-h-screen flex-col bg-surface text-text-primary lg:h-screen lg:flex-row">
      {/* Left: Form Editor */}
      <div className="editor-panel flex w-full flex-col border-b border-border lg:w-[480px] lg:min-w-[480px] lg:overflow-hidden lg:border-r lg:border-b-0">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <h1 className="text-base font-semibold tracking-tight"><a href="/" className="hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" title="Back to landing page">CV Builder</a></h1>
          <a href="#preview" className="text-sm font-medium text-accent underline underline-offset-4 lg:hidden">Go to preview</a>
          <TemplateSelector />
        </header>
        <div className="px-4 py-4 lg:flex-1 lg:overflow-y-auto">
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
      <div id="preview" className="flex w-full flex-1 flex-col bg-surface-alt/40 lg:overflow-hidden">
        <div className="flex-1 p-4 lg:overflow-y-auto">
          <PreviewPanel />
        </div>
      </div>
    </div>
  );
}
