import { PersonalInfo } from './personal-info.interface';
import { WorkExperience } from './work-experience.interface';
import { Education } from './education.interface';
import { Skill } from './skill.interface';
import { Project } from './project.interface';
import { Certificate } from './certificate.interface';
import { Language } from './language.interface';

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certificates: Certificate[];
  languages: Language[];
  template: string;
  lastModified: Date;
  isPublic: boolean;
}

export interface ResumeTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  isDefault: boolean;
  atsOptimized: boolean;
  colorScheme: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  layout: 'single-column' | 'two-column' | 'modern' | 'classic';
}