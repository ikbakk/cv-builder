import localforage from 'localforage';
import type { ResumeData, TemplateId, CustomTemplate } from '../domain/types';

const RESUME_KEY = 'cv-builder:resume-data';
const TEMPLATE_KEY = 'cv-builder:selected-template';
const CUSTOM_TEMPLATE_KEY = 'cv-builder:custom-template';

export async function saveResumeData(data: ResumeData): Promise<void> {
  await localforage.setItem(RESUME_KEY, data);
}

export async function loadResumeData(): Promise<ResumeData | null> {
  return localforage.getItem<ResumeData>(RESUME_KEY);
}

export async function saveTemplateId(id: TemplateId): Promise<void> {
  await localforage.setItem(TEMPLATE_KEY, id);
}

export async function loadTemplateId(): Promise<TemplateId | null> {
  return localforage.getItem<TemplateId>(TEMPLATE_KEY);
}

export async function saveCustomTemplate(tmpl: CustomTemplate): Promise<void> {
  await localforage.setItem(CUSTOM_TEMPLATE_KEY, tmpl);
}

export async function loadCustomTemplate(): Promise<CustomTemplate | null> {
  return localforage.getItem<CustomTemplate>(CUSTOM_TEMPLATE_KEY);
}

export async function removeCustomTemplate(): Promise<void> {
  await localforage.removeItem(CUSTOM_TEMPLATE_KEY);
}
