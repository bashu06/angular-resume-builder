import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { Education } from '../../../core/models/education.interface';

@Component({
  selector: 'app-education-editor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Education</mat-card-title>
        <mat-card-subtitle>Your educational background</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (education().length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">school</mat-icon>
            <p>No education added yet</p>
            <button mat-raised-button color="primary" (click)="addEducation()">
              <mat-icon>add</mat-icon>
              Add Education
            </button>
          </div>
        } @else {
          <div class="education-list">
            @for (edu of education(); track edu.id) {
              <div class="education-item">
                <div class="education-header">
                  <div class="education-title">
                    <h3>{{ edu.degree }} in {{ edu.field }}</h3>
                    <p class="institution">{{ edu.institution }} • {{ edu.location }}</p>
                    <p class="dates">{{ edu.startDate }} - {{ edu.isCurrentlyEnrolled ? 'Present' : edu.endDate }}</p>
                  </div>
                  <div class="education-actions">
                    <button mat-icon-button color="warn" (click)="removeEducation(edu.id)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
              </div>
            }
          </div>
          
          <div class="add-button-container">
            <button mat-raised-button color="primary" (click)="addEducation()">
              <mat-icon>add</mat-icon>
              Add Another Education
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
    
    .education-item {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      background-color: #fafafa;
    }
    
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }
    
    .education-title h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
    }
    
    .institution {
      margin: 0 0 4px 0;
      color: #666;
      font-weight: 500;
    }
    
    .dates {
      margin: 0;
      color: #999;
      font-size: 14px;
    }
    
    .add-button-container {
      text-align: center;
      margin-top: 24px;
    }
  `]
})
export class EducationEditorComponent {
  private resumeState = inject(ResumeStateService);
  
  education = this.resumeState.education;

  addEducation() {
    const newEducation: Education = {
      id: `edu-${Date.now()}`,
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      institution: 'University Name',
      location: 'City, State',
      startDate: '2016-08',
      endDate: '2020-05',
      isCurrentlyEnrolled: false
    };
    
    this.resumeState.addEducation(newEducation);
  }

  removeEducation(educationId: string) {
    this.resumeState.removeEducation(educationId);
  }
}