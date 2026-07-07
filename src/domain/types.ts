export interface Profile {
  name: string;
  headline: string;
  location: string;
  email: string;
  phone: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  tech: string;
  intro: string;
  bullets: string[];
}

export interface Skill {
  category: string;
  skills: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface ResumeData {
  profile: Profile;
  summary: string;
  experiences: Experience[];
  skills: Skill[];
  education: Education;
  additional: string[];
}

export type BuiltInTemplate = 'ats' | 'professional';
export type TemplateId = BuiltInTemplate | 'custom';

export interface CustomTemplate {
  name: string;
  content: string;
}

export type EditorStatus = 'idle' | 'compiling' | 'ready' | 'error';
