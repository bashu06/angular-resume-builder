import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PersonalInfoEditorComponent } from '../editor/personal-info-editor/personal-info-editor.component';
import { ExperienceEditorComponent } from '../editor/experience-editor/experience-editor.component';
import { EducationEditorComponent } from '../editor/education-editor/education-editor.component';
import { SkillsEditorComponent } from '../editor/skills-editor/skills-editor.component';
import { ProjectsEditorComponent } from '../editor/projects-editor/projects-editor.component';
import { ResumePreviewComponent } from '../preview/resume-preview/resume-preview.component';

export type EditorSection = 'personal' | 'experience' | 'education' | 'skills' | 'projects';

@Component({
  selector: 'app-builder',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    PersonalInfoEditorComponent,
    ExperienceEditorComponent,
    EducationEditorComponent,
    SkillsEditorComponent,
    ProjectsEditorComponent,
    ResumePreviewComponent
  ],
  template: `
    <div class="builder-container">
      <mat-sidenav-container class="sidenav-container">
        <mat-sidenav mode="side" opened class="sidenav">
          <mat-nav-list>
            <h3 matSubheader>Resume Sections</h3>
            
            <mat-list-item 
              [class.active]="activeSection === 'personal'"
              (click)="setActiveSection('personal')">
              <mat-icon matListItemIcon>person</mat-icon>
              <span matListItemTitle>Personal Info</span>
            </mat-list-item>
            
            <mat-list-item 
              [class.active]="activeSection === 'experience'"
              (click)="setActiveSection('experience')">
              <mat-icon matListItemIcon>work</mat-icon>
              <span matListItemTitle>Experience</span>
            </mat-list-item>
            
            <mat-list-item 
              [class.active]="activeSection === 'education'"
              (click)="setActiveSection('education')">
              <mat-icon matListItemIcon>school</mat-icon>
              <span matListItemTitle>Education</span>
            </mat-list-item>
            
            <mat-list-item 
              [class.active]="activeSection === 'skills'"
              (click)="setActiveSection('skills')">
              <mat-icon matListItemIcon>star</mat-icon>
              <span matListItemTitle>Skills</span>
            </mat-list-item>
            
            <mat-list-item 
              [class.active]="activeSection === 'projects'"
              (click)="setActiveSection('projects')">
              <mat-icon matListItemIcon>code</mat-icon>
              <span matListItemTitle>Projects</span>
            </mat-list-item>
          </mat-nav-list>
        </mat-sidenav>
        
        <mat-sidenav-content class="content">
          <div class="editor-panel">
            <div class="editor-content">
              @switch (activeSection) {
                @case ('personal') {
                  <app-personal-info-editor></app-personal-info-editor>
                }
                @case ('experience') {
                  <app-experience-editor></app-experience-editor>
                }
                @case ('education') {
                  <app-education-editor></app-education-editor>
                }
                @case ('skills') {
                  <app-skills-editor></app-skills-editor>
                }
                @case ('projects') {
                  <app-projects-editor></app-projects-editor>
                }
              }
            </div>
          </div>
          
          <div class="preview-panel">
            <app-resume-preview></app-resume-preview>
          </div>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .builder-container {
      height: calc(100vh - 64px);
      display: flex;
    }
    
    .sidenav-container {
      flex: 1;
    }
    
    .sidenav {
      width: 280px;
      border-right: 1px solid #e0e0e0;
    }
    
    .content {
      display: flex;
      height: 100%;
    }
    
    .editor-panel {
      flex: 1;
      min-width: 400px;
      max-width: 600px;
      overflow-y: auto;
      border-right: 1px solid #e0e0e0;
    }
    
    .editor-content {
      padding: 24px;
    }
    
    .preview-panel {
      flex: 1;
      overflow-y: auto;
      background-color: #f5f5f5;
    }
    
    mat-list-item {
      cursor: pointer;
      transition: background-color 0.2s ease;
    }
    
    mat-list-item:hover {
      background-color: rgba(0, 0, 0, 0.04);
    }
    
    mat-list-item.active {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196f3;
    }
    
    mat-list-item.active mat-icon {
      color: #2196f3;
    }
    
    h3[matSubheader] {
      font-weight: 500;
      color: #424242;
    }
  `]
})
export class BuilderComponent {
  activeSection: EditorSection = 'personal';

  setActiveSection(section: EditorSection) {
    this.activeSection = section;
  }
}