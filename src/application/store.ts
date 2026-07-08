import { create } from 'zustand';
import type { ResumeData, TemplateId, EditorStatus, CustomTemplate } from '../domain/types';
import { defaultResumeData } from '../domain/defaults';
import { saveResumeData, saveTemplateId, saveCustomTemplate } from '../infrastructure/storage';

interface ResumeStore {
  data: ResumeData;
  template: TemplateId;
  customTemplate: CustomTemplate | null;
  status: EditorStatus;
  error: string | null;

  setData: (data: ResumeData) => void;
  updateProfile: (patch: Partial<ResumeData['profile']>) => void;
  updateSummary: (summary: string) => void;
  updateExperience: (index: number, patch: Partial<ResumeData['experiences'][number]>) => void;
  addExperience: () => void;
  removeExperience: (index: number) => void;
  updateSkill: (index: number, patch: Partial<ResumeData['skills'][number]>) => void;
  addSkill: () => void;
  removeSkill: (index: number) => void;
  updateEducation: (patch: Partial<ResumeData['education']>) => void;
  updateAdditional: (items: string[]) => void;
  setTemplate: (template: TemplateId) => void;
  setCustomTemplate: (tmpl: CustomTemplate | null) => void;
  setStatus: (status: EditorStatus) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set, get) => ({
  data: defaultResumeData,
  template: 'ats' as TemplateId,
  customTemplate: null as CustomTemplate | null,
  status: 'idle' as EditorStatus,
  error: null,

  setData: (data) => {
    set({ data });
    saveResumeData(data);
  },

  updateProfile: (patch) => {
    const data = { ...get().data, profile: { ...get().data.profile, ...patch } };
    set({ data });
    saveResumeData(data);
  },

  updateSummary: (summary) => {
    const data = { ...get().data, summary };
    set({ data });
    saveResumeData(data);
  },

  updateExperience: (index, patch) => {
    const experiences = [...get().data.experiences];
    if (experiences[index]) {
      experiences[index] = { ...experiences[index], ...patch };
    }
    const data = { ...get().data, experiences };
    set({ data });
    saveResumeData(data);
  },

  addExperience: () => {
    const experiences = [
      ...get().data.experiences,
      {
        title: '',
        company: '',
        period: '',
        tech: '',
        intro: '',
        bullets: [''],
      },
    ];
    const data = { ...get().data, experiences };
    set({ data });
    saveResumeData(data);
  },

  removeExperience: (index) => {
    const experiences = get().data.experiences.filter((_, i) => i !== index);
    const data = { ...get().data, experiences };
    set({ data });
    saveResumeData(data);
  },

  updateSkill: (index, patch) => {
    const skills = [...get().data.skills];
    if (skills[index]) {
      skills[index] = { ...skills[index], ...patch };
    }
    const data = { ...get().data, skills };
    set({ data });
    saveResumeData(data);
  },

  addSkill: () => {
    const skills = [
      ...get().data.skills,
      { category: '', skills: '' },
    ];
    const data = { ...get().data, skills };
    set({ data });
    saveResumeData(data);
  },

  removeSkill: (index) => {
    const skills = get().data.skills.filter((_, i) => i !== index);
    const data = { ...get().data, skills };
    set({ data });
    saveResumeData(data);
  },

  updateEducation: (patch) => {
    const data = { ...get().data, education: { ...get().data.education, ...patch } };
    set({ data });
    saveResumeData(data);
  },

  updateAdditional: (items) => {
    const data = { ...get().data, additional: items };
    set({ data });
    saveResumeData(data);
  },

  setTemplate: (template) => {
    set({ template });
    saveTemplateId(template);
  },

  setCustomTemplate: (tmpl) => {
    set({ customTemplate: tmpl });
    if (tmpl) saveCustomTemplate(tmpl);
  },

  setStatus: (status) => set({ status }),
  setError: (error) => set({ error }),

  reset: () => set({ data: defaultResumeData, customTemplate: null, status: 'idle', error: null }),
}));
