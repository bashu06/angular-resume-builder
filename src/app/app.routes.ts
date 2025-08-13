import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/builder',
    pathMatch: 'full'
  },
  {
    path: 'builder',
    loadComponent: () => import('./features/builder/builder.component').then(m => m.BuilderComponent)
  },
  {
    path: 'preview',
    loadComponent: () => import('./features/preview/resume-preview/resume-preview.component').then(m => m.ResumePreviewComponent)
  }
];