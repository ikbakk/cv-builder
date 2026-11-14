import type { ResumeData } from './types';

export const defaultResumeData: ResumeData = {
  profile: {
    name: '',
    headline: '',
    location: '',
    email: '',
    phone: '',
    portfolio: '',
    github: '',
    linkedin: '',
  },
  summary: '',
  experiences: [],
  skills: [],
  education: {
    degree: '',
    institution: '',
    location: '',
    period: '',
  },
  additional: [],
};
