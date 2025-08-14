import { Component, computed, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { CommonModule } from '@angular/common';
import { Skill } from '../../../core/models';

interface SkillCategory {
  name: string;
  skills: Skill[];
}

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.scss'
})
export class ResumePreviewComponent {
  private resumeState = inject(ResumeStateService);

  // Computed signals for reactive data
  personalInfo = this.resumeState.personalInfo;
  workExperience = this.resumeState.workExperience;
  education = this.resumeState.education;
  skills = this.resumeState.skills;
  projects = this.resumeState.projects;
  
  fullName = computed(() => {
    const info = this.personalInfo();
    return info ? `${info.firstName} ${info.lastName}`.trim() : '';
  });

  formatDate(date: Date | string): string {
    const d = new Date(date);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric'
    }).format(d);
  }

  getSkillCategories(): SkillCategory[] {
    const skills = this.skills();
    const categories: Record<string, Skill[]> = {};
    
    skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = [];
      }
      categories[skill.category].push(skill);
    });

    return Object.entries(categories).map(([name, skills]) => ({
      name,
      skills
    }));
  }
}
