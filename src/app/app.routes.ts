import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/personal', pathMatch: 'full' },
  { 
    path: 'personal', 
    loadComponent: () => import('./features/editor/personal-info-editor/personal-info-editor.component').then(m => m.PersonalInfoEditorComponent)
  },
  { 
    path: 'experience', 
    loadComponent: () => import('./features/editor/experience-editor/experience-editor.component').then(m => m.ExperienceEditorComponent)
  },
  { 
    path: 'education', 
    loadComponent: () => import('./features/editor/education-editor/education-editor.component').then(m => m.EducationEditorComponent)
  },
  { 
    path: 'skills', 
    loadComponent: () => import('./features/editor/skills-editor/skills-editor.component').then(m => m.SkillsEditorComponent)
  },
  { 
    path: 'projects', 
    loadComponent: () => import('./features/editor/projects-editor/projects-editor.component').then(m => m.ProjectsEditorComponent)
  },
  { 
    path: 'certificates', 
    loadComponent: () => import('./features/editor/certificates-editor/certificates-editor.component').then(m => m.CertificatesEditorComponent)
  },
  { 
    path: 'languages', 
    loadComponent: () => import('./features/editor/languages-editor/languages-editor.component').then(m => m.LanguagesEditorComponent)
  },
  { 
    path: 'preview', 
    loadComponent: () => import('./features/preview/resume-preview/resume-preview.component').then(m => m.ResumePreviewComponent)
  }
];
