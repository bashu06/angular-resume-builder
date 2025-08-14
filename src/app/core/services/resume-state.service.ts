import { Injectable, signal, computed } from '@angular/core';
import { Resume, PersonalInfo, WorkExperience, Education, Skill, Project, Certificate, Language } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ResumeStateService {
  // Main resume signal
  private _resume = signal<Resume | null>(null);
  
  // Computed getters for each section
  personalInfo = computed(() => this._resume()?.personalInfo || null);
  workExperience = computed(() => this._resume()?.workExperience || []);
  education = computed(() => this._resume()?.education || []);
  skills = computed(() => this._resume()?.skills || []);
  projects = computed(() => this._resume()?.projects || []);
  certificates = computed(() => this._resume()?.certificates || []);
  languages = computed(() => this._resume()?.languages || []);
  template = computed(() => this._resume()?.template || 'default');
  lastModified = computed(() => this._resume()?.lastModified);

  // Full resume getter
  resume = this._resume.asReadonly();

  constructor() {
    this.initializeEmptyResume();
  }

  private initializeEmptyResume(): void {
    const emptyResume: Resume = {
      id: this.generateId(),
      personalInfo: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        summary: ''
      },
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      certificates: [],
      languages: [],
      template: 'default',
      lastModified: new Date(),
      isPublic: false
    };
    this._resume.set(emptyResume);
  }

  loadResume(resume: Resume): void {
    this._resume.set({
      ...resume,
      lastModified: new Date()
    });
  }

  updatePersonalInfo(personalInfo: Partial<PersonalInfo>): void {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        personalInfo: { ...currentResume.personalInfo, ...personalInfo },
        lastModified: new Date()
      });
    }
  }

  addWorkExperience(experience: Omit<WorkExperience, 'id'>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const newExperience: WorkExperience = {
        ...experience,
        id: this.generateId()
      };
      this._resume.set({
        ...currentResume,
        workExperience: [...currentResume.workExperience, newExperience],
        lastModified: new Date()
      });
    }
  }

  updateWorkExperience(id: string, updates: Partial<WorkExperience>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedExperience = currentResume.workExperience.map(exp =>
        exp.id === id ? { ...exp, ...updates } : exp
      );
      this._resume.set({
        ...currentResume,
        workExperience: updatedExperience,
        lastModified: new Date()
      });
    }
  }

  removeWorkExperience(id: string): void {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredExperience = currentResume.workExperience.filter(exp => exp.id !== id);
      this._resume.set({
        ...currentResume,
        workExperience: filteredExperience,
        lastModified: new Date()
      });
    }
  }

  addEducation(education: Omit<Education, 'id'>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const newEducation: Education = {
        ...education,
        id: this.generateId()
      };
      this._resume.set({
        ...currentResume,
        education: [...currentResume.education, newEducation],
        lastModified: new Date()
      });
    }
  }

  updateEducation(id: string, updates: Partial<Education>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedEducation = currentResume.education.map(edu =>
        edu.id === id ? { ...edu, ...updates } : edu
      );
      this._resume.set({
        ...currentResume,
        education: updatedEducation,
        lastModified: new Date()
      });
    }
  }

  removeEducation(id: string): void {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredEducation = currentResume.education.filter(edu => edu.id !== id);
      this._resume.set({
        ...currentResume,
        education: filteredEducation,
        lastModified: new Date()
      });
    }
  }

  addSkill(skill: Omit<Skill, 'id'>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const newSkill: Skill = {
        ...skill,
        id: this.generateId()
      };
      this._resume.set({
        ...currentResume,
        skills: [...currentResume.skills, newSkill],
        lastModified: new Date()
      });
    }
  }

  updateSkill(id: string, updates: Partial<Skill>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedSkills = currentResume.skills.map(skill =>
        skill.id === id ? { ...skill, ...updates } : skill
      );
      this._resume.set({
        ...currentResume,
        skills: updatedSkills,
        lastModified: new Date()
      });
    }
  }

  removeSkill(id: string): void {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredSkills = currentResume.skills.filter(skill => skill.id !== id);
      this._resume.set({
        ...currentResume,
        skills: filteredSkills,
        lastModified: new Date()
      });
    }
  }

  // Similar methods for projects, certificates, and languages...
  addProject(project: Omit<Project, 'id'>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const newProject: Project = {
        ...project,
        id: this.generateId()
      };
      this._resume.set({
        ...currentResume,
        projects: [...currentResume.projects, newProject],
        lastModified: new Date()
      });
    }
  }

  updateProject(id: string, updates: Partial<Project>): void {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedProjects = currentResume.projects.map(project =>
        project.id === id ? { ...project, ...updates } : project
      );
      this._resume.set({
        ...currentResume,
        projects: updatedProjects,
        lastModified: new Date()
      });
    }
  }

  removeProject(id: string): void {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredProjects = currentResume.projects.filter(project => project.id !== id);
      this._resume.set({
        ...currentResume,
        projects: filteredProjects,
        lastModified: new Date()
      });
    }
  }

  setTemplate(template: string): void {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        template,
        lastModified: new Date()
      });
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}