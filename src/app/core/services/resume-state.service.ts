import { Injectable, signal, computed } from '@angular/core';
import { Resume } from '../models/resume.interface';
import { PersonalInfo } from '../models/personal-info.interface';
import { WorkExperience } from '../models/work-experience.interface';
import { Education } from '../models/education.interface';
import { Skill } from '../models/skill.interface';
import { Project } from '../models/project.interface';

@Injectable({
  providedIn: 'root'
})
export class ResumeStateService {
  // Core resume state
  private readonly _resume = signal<Resume | null>(null);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  // Public readonly signals
  readonly resume = this._resume.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Computed selectors
  readonly personalInfo = computed(() => this._resume()?.personalInfo || null);
  readonly workExperience = computed(() => this._resume()?.workExperience || []);
  readonly education = computed(() => this._resume()?.education || []);
  readonly skills = computed(() => this._resume()?.skills || []);
  readonly projects = computed(() => this._resume()?.projects || []);
  
  readonly hasData = computed(() => {
    const resume = this._resume();
    return !!(resume?.personalInfo?.fullName || 
              resume?.workExperience?.length || 
              resume?.education?.length || 
              resume?.skills?.length || 
              resume?.projects?.length);
  });

  constructor() {
    this.initializeDefaultResume();
  }

  private initializeDefaultResume() {
    const defaultResume: Resume = {
      id: 'default',
      personalInfo: {
        id: 'personal-info-1',
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        summary: '',
        jobTitle: ''
      },
      workExperience: [],
      education: [],
      skills: [],
      projects: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId: 'modern'
    };
    this._resume.set(defaultResume);
  }

  // State mutations
  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }

  setError(error: string | null) {
    this._error.set(error);
  }

  setResume(resume: Resume) {
    this._resume.set({
      ...resume,
      updatedAt: new Date()
    });
    this._error.set(null);
  }

  updatePersonalInfo(personalInfo: PersonalInfo) {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        personalInfo,
        updatedAt: new Date()
      });
    }
  }

  addWorkExperience(experience: WorkExperience) {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        workExperience: [...currentResume.workExperience, experience],
        updatedAt: new Date()
      });
    }
  }

  updateWorkExperience(experienceId: string, updatedExperience: WorkExperience) {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedExperiences = currentResume.workExperience.map(exp =>
        exp.id === experienceId ? updatedExperience : exp
      );
      this._resume.set({
        ...currentResume,
        workExperience: updatedExperiences,
        updatedAt: new Date()
      });
    }
  }

  removeWorkExperience(experienceId: string) {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredExperiences = currentResume.workExperience.filter(exp => exp.id !== experienceId);
      this._resume.set({
        ...currentResume,
        workExperience: filteredExperiences,
        updatedAt: new Date()
      });
    }
  }

  addEducation(education: Education) {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        education: [...currentResume.education, education],
        updatedAt: new Date()
      });
    }
  }

  updateEducation(educationId: string, updatedEducation: Education) {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedEducations = currentResume.education.map(edu =>
        edu.id === educationId ? updatedEducation : edu
      );
      this._resume.set({
        ...currentResume,
        education: updatedEducations,
        updatedAt: new Date()
      });
    }
  }

  removeEducation(educationId: string) {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredEducations = currentResume.education.filter(edu => edu.id !== educationId);
      this._resume.set({
        ...currentResume,
        education: filteredEducations,
        updatedAt: new Date()
      });
    }
  }

  addSkill(skill: Skill) {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        skills: [...currentResume.skills, skill],
        updatedAt: new Date()
      });
    }
  }

  updateSkill(skillId: string, updatedSkill: Skill) {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedSkills = currentResume.skills.map(skill =>
        skill.id === skillId ? updatedSkill : skill
      );
      this._resume.set({
        ...currentResume,
        skills: updatedSkills,
        updatedAt: new Date()
      });
    }
  }

  removeSkill(skillId: string) {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredSkills = currentResume.skills.filter(skill => skill.id !== skillId);
      this._resume.set({
        ...currentResume,
        skills: filteredSkills,
        updatedAt: new Date()
      });
    }
  }

  addProject(project: Project) {
    const currentResume = this._resume();
    if (currentResume) {
      this._resume.set({
        ...currentResume,
        projects: [...currentResume.projects, project],
        updatedAt: new Date()
      });
    }
  }

  updateProject(projectId: string, updatedProject: Project) {
    const currentResume = this._resume();
    if (currentResume) {
      const updatedProjects = currentResume.projects.map(project =>
        project.id === projectId ? updatedProject : project
      );
      this._resume.set({
        ...currentResume,
        projects: updatedProjects,
        updatedAt: new Date()
      });
    }
  }

  removeProject(projectId: string) {
    const currentResume = this._resume();
    if (currentResume) {
      const filteredProjects = currentResume.projects.filter(project => project.id !== projectId);
      this._resume.set({
        ...currentResume,
        projects: filteredProjects,
        updatedAt: new Date()
      });
    }
  }

  loadSampleData() {
    const sampleResume: Resume = {
      id: 'sample',
      personalInfo: {
        id: 'personal-info-sample',
        fullName: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main Street',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94105',
        country: 'USA',
        website: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        github: 'https://github.com/johndoe',
        summary: 'Experienced full-stack developer with 5+ years of expertise in modern web technologies. Passionate about creating scalable applications and leading development teams.',
        jobTitle: 'Senior Full Stack Developer'
      },
      workExperience: [
        {
          id: 'exp-1',
          jobTitle: 'Senior Full Stack Developer',
          company: 'Tech Solutions Inc.',
          location: 'San Francisco, CA',
          startDate: '2022-01',
          endDate: null,
          isCurrentJob: true,
          description: 'Lead development of enterprise web applications using Angular and Node.js',
          achievements: [
            'Improved application performance by 40% through optimization',
            'Led a team of 4 developers on critical projects',
            'Implemented CI/CD pipeline reducing deployment time by 60%'
          ],
          technologies: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'AWS']
        },
        {
          id: 'exp-2',
          jobTitle: 'Full Stack Developer',
          company: 'StartupXYZ',
          location: 'San Francisco, CA',
          startDate: '2020-03',
          endDate: '2021-12',
          isCurrentJob: false,
          description: 'Developed and maintained web applications for e-commerce platform',
          achievements: [
            'Built responsive UI components used by 10,000+ daily users',
            'Reduced API response time by 35% through optimization',
            'Mentored 2 junior developers'
          ],
          technologies: ['React', 'Express.js', 'PostgreSQL', 'Docker']
        }
      ],
      education: [
        {
          id: 'edu-1',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          institution: 'University of California, Berkeley',
          location: 'Berkeley, CA',
          startDate: '2016-08',
          endDate: '2020-05',
          isCurrentlyEnrolled: false,
          gpa: '3.8',
          honors: 'Magna Cum Laude',
          relevantCourses: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Systems']
        }
      ],
      skills: [
        { id: 'skill-1', name: 'JavaScript', level: 'Expert', category: 'Technical' },
        { id: 'skill-2', name: 'TypeScript', level: 'Expert', category: 'Technical' },
        { id: 'skill-3', name: 'Angular', level: 'Expert', category: 'Framework' },
        { id: 'skill-4', name: 'React', level: 'Advanced', category: 'Framework' },
        { id: 'skill-5', name: 'Node.js', level: 'Advanced', category: 'Technical' },
        { id: 'skill-6', name: 'Python', level: 'Intermediate', category: 'Technical' },
        { id: 'skill-7', name: 'AWS', level: 'Intermediate', category: 'Tool' },
        { id: 'skill-8', name: 'Docker', level: 'Intermediate', category: 'Tool' }
      ],
      projects: [
        {
          id: 'project-1',
          name: 'E-Commerce Platform',
          description: 'Full-featured e-commerce platform with payment integration and admin dashboard',
          startDate: '2023-01',
          endDate: '2023-06',
          isOngoing: false,
          technologies: ['Angular', 'Node.js', 'MongoDB', 'Stripe API'],
          url: 'https://demo-ecommerce.com',
          githubUrl: 'https://github.com/johndoe/ecommerce-platform',
          achievements: [
            'Processed over $100K in transactions during beta',
            'Achieved 99.9% uptime',
            'Integrated with 3 payment gateways'
          ],
          role: 'Lead Developer'
        },
        {
          id: 'project-2',
          name: 'Task Management App',
          description: 'Collaborative task management application with real-time updates',
          startDate: '2022-08',
          endDate: null,
          isOngoing: true,
          technologies: ['React', 'Firebase', 'Material-UI'],
          url: 'https://taskmaster-app.com',
          githubUrl: 'https://github.com/johndoe/task-manager',
          achievements: [
            '1000+ active users',
            'Real-time collaboration features',
            'Mobile-responsive design'
          ],
          role: 'Full Stack Developer'
        }
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId: 'modern'
    };

    this._resume.set(sampleResume);
  }
}