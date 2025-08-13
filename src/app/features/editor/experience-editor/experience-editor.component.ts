import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { WorkExperience } from '../../../core/models/work-experience.interface';

@Component({
  selector: 'app-experience-editor',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Work Experience</mat-card-title>
        <mat-card-subtitle>Your professional experience and achievements</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (workExperience().length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">work_outline</mat-icon>
            <p>No work experience added yet</p>
            <button mat-raised-button color="primary" (click)="addExperience()">
              <mat-icon>add</mat-icon>
              Add Work Experience
            </button>
          </div>
        } @else {
          <div class="experience-list">
            @for (experience of workExperience(); track experience.id) {
              <div class="experience-item">
                <div class="experience-header">
                  <div class="experience-title">
                    <h3>{{ experience.jobTitle }}</h3>
                    <p class="company">{{ experience.company }} • {{ experience.location }}</p>
                    <p class="dates">
                      {{ experience.startDate }} - {{ experience.isCurrentJob ? 'Present' : experience.endDate }}
                    </p>
                  </div>
                  <div class="experience-actions">
                    <button mat-icon-button (click)="editExperience(experience)">
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button mat-icon-button color="warn" (click)="removeExperience(experience.id)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
                
                <div class="experience-content">
                  <p class="description">{{ experience.description }}</p>
                  
                  @if (experience.achievements.length > 0) {
                    <div class="achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        @for (achievement of experience.achievements; track achievement) {
                          <li>{{ achievement }}</li>
                        }
                      </ul>
                    </div>
                  }
                  
                  @if (experience.technologies && experience.technologies.length > 0) {
                    <div class="technologies">
                      <h4>Technologies:</h4>
                      <div class="tech-chips">
                        @for (tech of experience.technologies; track tech) {
                          <span class="tech-chip">{{ tech }}</span>
                        }
                      </div>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
          
          <div class="add-button-container">
            <button mat-raised-button color="primary" (click)="addExperience()">
              <mat-icon>add</mat-icon>
              Add Another Experience
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
    
    .experience-list {
      margin-bottom: 24px;
    }
    
    .experience-item {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      background-color: #fafafa;
    }
    
    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    
    .experience-title h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
    }
    
    .company {
      margin: 0 0 4px 0;
      color: #666;
      font-weight: 500;
    }
    
    .dates {
      margin: 0;
      color: #999;
      font-size: 14px;
    }
    
    .experience-actions {
      display: flex;
      gap: 8px;
    }
    
    .description {
      margin: 0 0 16px 0;
      line-height: 1.6;
    }
    
    .achievements h4,
    .technologies h4 {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    
    .achievements ul {
      margin: 0;
      padding-left: 20px;
    }
    
    .achievements li {
      margin-bottom: 4px;
    }
    
    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    
    .tech-chip {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .add-button-container {
      text-align: center;
      margin-top: 24px;
    }
  `]
})
export class ExperienceEditorComponent {
  private resumeState = inject(ResumeStateService);
  
  workExperience = this.resumeState.workExperience;

  addExperience() {
    const newExperience: WorkExperience = {
      id: `exp-${Date.now()}`,
      jobTitle: 'Job Title',
      company: 'Company Name',
      location: 'City, State',
      startDate: new Date().toISOString().substr(0, 7), // YYYY-MM format
      endDate: null,
      isCurrentJob: true,
      description: 'Describe your role and responsibilities...',
      achievements: [],
      technologies: []
    };
    
    this.resumeState.addWorkExperience(newExperience);
  }

  editExperience(experience: WorkExperience) {
    // TODO: Open edit dialog
    console.log('Edit experience:', experience);
  }

  removeExperience(experienceId: string) {
    this.resumeState.removeWorkExperience(experienceId);
  }
}