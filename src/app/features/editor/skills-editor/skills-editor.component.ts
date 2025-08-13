import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { Skill } from '../../../core/models/skill.interface';

@Component({
  selector: 'app-skills-editor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatChipsModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Skills</mat-card-title>
        <mat-card-subtitle>Your technical and professional skills</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (skills().length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">star_outline</mat-icon>
            <p>No skills added yet</p>
            <button mat-raised-button color="primary" (click)="addSkill()">
              <mat-icon>add</mat-icon>
              Add Skill
            </button>
          </div>
        } @else {
          <div class="skills-by-category">
            @for (category of skillCategories; track category) {
              @if (getSkillsByCategory(category).length > 0) {
                <div class="skill-category">
                  <h3>{{ category }}</h3>
                  <div class="skills-grid">
                    @for (skill of getSkillsByCategory(category); track skill.id) {
                      <div class="skill-item">
                        <div class="skill-content">
                          <span class="skill-name">{{ skill.name }}</span>
                          <span class="skill-level" [class]="'level-' + skill.level.toLowerCase()">
                            {{ skill.level }}
                          </span>
                        </div>
                        <button mat-icon-button color="warn" (click)="removeSkill(skill.id)" class="remove-btn">
                          <mat-icon>close</mat-icon>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              }
            }
          </div>
          
          <div class="add-button-container">
            <button mat-raised-button color="primary" (click)="addSkill()">
              <mat-icon>add</mat-icon>
              Add Another Skill
            </button>
          </div>
        }
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .empty-state {
      text-align: center;
      padding: 48px 24px;
      color: #666;
    }
    
    .empty-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #ccc;
      margin-bottom: 16px;
    }
    
    .skill-category {
      margin-bottom: 24px;
    }
    
    .skill-category h3 {
      margin: 0 0 12px 0;
      color: #333;
      font-size: 16px;
      font-weight: 500;
    }
    
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .skill-item {
      display: flex;
      align-items: center;
      background-color: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      padding: 8px 12px;
      gap: 8px;
    }
    
    .skill-content {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .skill-name {
      font-weight: 500;
    }
    
    .skill-level {
      font-size: 12px;
      padding: 2px 8px;
      border-radius: 12px;
      font-weight: 500;
    }
    
    .level-beginner {
      background-color: #ffebee;
      color: #c62828;
    }
    
    .level-intermediate {
      background-color: #fff3e0;
      color: #ef6c00;
    }
    
    .level-advanced {
      background-color: #e8f5e8;
      color: #2e7d32;
    }
    
    .level-expert {
      background-color: #e3f2fd;
      color: #1565c0;
    }
    
    .remove-btn {
      width: 20px;
      height: 20px;
      line-height: 1;
    }
    
    .remove-btn mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
    
    .add-button-container {
      text-align: center;
      margin-top: 24px;
    }
  `]
})
export class SkillsEditorComponent {
  private resumeState = inject(ResumeStateService);
  
  skills = this.resumeState.skills;
  
  skillCategories = ['Technical', 'Framework', 'Tool', 'Language', 'Soft'];

  getSkillsByCategory(category: string): Skill[] {
    return this.skills().filter(skill => skill.category === category);
  }

  addSkill() {
    const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'] as const;
    const categories = ['Technical', 'Framework', 'Tool', 'Language', 'Soft'] as const;
    
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: 'New Skill',
      level: skillLevels[2], // Advanced
      category: categories[0] // Technical
    };
    
    this.resumeState.addSkill(newSkill);
  }

  removeSkill(skillId: string) {
    this.resumeState.removeSkill(skillId);
  }
}