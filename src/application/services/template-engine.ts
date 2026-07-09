import type { ResumeData } from '../../domain/types';

function escapeTypst(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function generateProfile(data: ResumeData['profile']): string {
  return `#let profile = (
  name: "${escapeTypst(data.name)}",
  headline: "${escapeTypst(data.headline)}",
  location: "${escapeTypst(data.location)}",
  email: "${escapeTypst(data.email)}",
  phone: "${escapeTypst(data.phone)}",
  portfolio: "${escapeTypst(data.portfolio)}",
  github: "${escapeTypst(data.github)}",
  linkedin: "${escapeTypst(data.linkedin)}",
)`;
}

function generateSummary(summary: string): string {
  return `#let summary = "${escapeTypst(summary)}"`;
}

function generateExperiences(experiences: ResumeData['experiences']): string {
  if (experiences.length === 0) return '#let experiences = ()';
  const items = experiences
    .map(
      (exp) => `  (
    title: "${escapeTypst(exp.title)}",
    company: "${escapeTypst(exp.company)}",
    period: "${escapeTypst(exp.period)}",
    tech: "${escapeTypst(exp.tech)}",
    intro: "${escapeTypst(exp.intro)}",
    bullets: (
${exp.bullets.map((b: string) => `      "${escapeTypst(b)}"`).join(',\n')}
    ),
  )`
    )
    .join(',\n');
  return `#let experiences = (\n${items},\n)`;
}

function generateSkills(skills: ResumeData['skills']): string {
  if (skills.length === 0) return '#let skills = ()';
  const items = skills
    .map((s) => `  ("${escapeTypst(s.category)}", "${escapeTypst(s.skills)}")`)
    .join(',\n');
  return `#let skills = (\n${items},\n)`;
}

function generateEducation(education: ResumeData['education']): string {
  return `#let education = (
  degree: "${escapeTypst(education.degree)}",
  institution: "${escapeTypst(education.institution)}",
  location: "${escapeTypst(education.location)}",
  period: "${escapeTypst(education.period)}",
)`;
}

function generateAdditional(additional: string[]): string {
  if (additional.length === 0) return '#let additional = ()';
  const items = additional.map((a) => `  "${escapeTypst(a)}"`).join(',\n');
  return `#let additional = (\n${items},\n)`;
}

export function generateDataTyp(data: ResumeData): string {
  return [
    generateProfile(data.profile),
    '',
    generateSummary(data.summary),
    '',
    generateExperiences(data.experiences),
    '',
    generateSkills(data.skills),
    '',
    generateEducation(data.education),
    '',
    generateAdditional(data.additional),
  ].join('\n');
}

const stripImports = (src: string) =>
  src.replace(/^#import\s+"[^"]*"\s*:\s*\*\s*$/gm, '').trim();

/**
 * Loads a built-in template and components from the server, strips imports,
 * and assembles the full Typst source.
 */
async function loadBuiltInTypstSource(
  data: ResumeData,
  templateId: 'ats' | 'professional'
): Promise<string> {
  const [templateSrc, componentsSrc] = await Promise.all([
    fetch(`/templates/${templateId}.typ`).then((r) => r.text()),
    fetch('/templates/components.typ').then((r) => r.text()),
  ]);

  const dataTyp = generateDataTyp(data);
  const cleanComponents = stripImports(componentsSrc);
  const cleanTemplate = stripImports(templateSrc);

  return [cleanComponents, dataTyp, cleanTemplate].join('\n\n');
}

/**
 * Uses a custom template source (user-uploaded), strips its imports,
 * and prepends only the shared components + generated data.
 * Falls back to built-in `components.typ` for `rule`, `section`, `header`, etc.
 */
async function loadCustomTypstSource(
  data: ResumeData,
  customContent: string
): Promise<string> {
  const componentsSrc = await fetch('/templates/components.typ').then((r) => r.text());

  const dataTyp = generateDataTyp(data);
  const cleanComponents = stripImports(componentsSrc);
  const cleanCustom = stripImports(customContent);

  return [cleanComponents, dataTyp, cleanCustom].join('\n\n');
}

/**
 * Assembles the full Typst source string for the given template.
 * For built-in templates it fetches the file from `/public/templates/`.
 * For custom templates it uses the provided content string.
 */
export async function assembleTypstSource(
  data: ResumeData,
  templateId: 'ats' | 'professional' | 'custom',
  customContent?: string
): Promise<string> {
  if (templateId === 'custom' && customContent) {
    return loadCustomTypstSource(data, customContent);
  }
  if (templateId === 'custom') {
    throw new Error('Custom template selected but no content provided');
  }
  return loadBuiltInTypstSource(data, templateId);
}
