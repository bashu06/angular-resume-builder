import { PersonalInfo } from './personal-info.interface';
import { WorkExperience } from './work-experience.interface';
import { Education } from './education.interface';
import { Skill } from './skill.interface';
import { Project } from './project.interface';

export interface Resume {
  id: string;
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  createdAt: Date;
  updatedAt: Date;
  templateId: string;
}