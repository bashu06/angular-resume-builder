import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface SidebarSection {
  id: string;
  title: string;
  icon: string;
  route: string;
  completed?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  sections: SidebarSection[] = [
    {
      id: 'personal',
      title: 'Personal Information',
      icon: 'person',
      route: '/personal',
      completed: false
    },
    {
      id: 'experience',
      title: 'Work Experience',
      icon: 'work',
      route: '/experience',
      completed: false
    },
    {
      id: 'education',
      title: 'Education',
      icon: 'school',
      route: '/education',
      completed: false
    },
    {
      id: 'skills',
      title: 'Skills',
      icon: 'build',
      route: '/skills',
      completed: false
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: 'code',
      route: '/projects',
      completed: false
    },
    {
      id: 'certificates',
      title: 'Certificates',
      icon: 'verified',
      route: '/certificates',
      completed: false
    },
    {
      id: 'languages',
      title: 'Languages',
      icon: 'language',
      route: '/languages',
      completed: false
    }
  ];

  constructor(private router: Router) {}

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
