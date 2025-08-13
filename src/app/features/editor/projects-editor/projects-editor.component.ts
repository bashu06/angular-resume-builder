import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { Project } from '../../../core/models/project.interface';

@Component({
  selector: 'app-projects-editor',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Projects</mat-card-title>
        <mat-card-subtitle>Your notable projects and achievements</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        @if (projects().length === 0) {
          <div class="empty-state">
            <mat-icon class="empty-icon">code</mat-icon>
            <p>No projects added yet</p>
            <button mat-raised-button color="primary" (click)="addProject()">
              <mat-icon>add</mat-icon>
              Add Project
            </button>
          </div>
        } @else {
          <div class="projects-list">
            @for (project of projects(); track project.id) {
              <div class="project-item">
                <div class="project-header">
                  <div class="project-title">
                    <h3>{{ project.name }}</h3>
                    <p class="role">{{ project.role }}</p>
                    <p class="dates">
                      {{ project.startDate }} - {{ project.isOngoing ? 'Ongoing' : project.endDate }}
                    </p>
                  </div>
                  <div class="project-actions">
                    <button mat-icon-button color="warn" (click)="removeProject(project.id)">
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </div>
                
                <div class="project-content">
                  <p class="description">{{ project.description }}</p>
                  
                  @if (project.url || project.githubUrl) {
                    <div class="project-links">
                      @if (project.url) {
                        <a [href]="project.url" target="_blank" class="project-link">
                          <mat-icon>launch</mat-icon>
                          Live Demo
                        </a>
                      }
                      @if (project.githubUrl) {
                        <a [href]="project.githubUrl" target="_blank" class="project-link">
                          <mat-icon>code</mat-icon>
                          GitHub
                        </a>
                      }
                    </div>
                  }
                  
                  @if (project.technologies.length > 0) {
                    <div class="technologies">
                      <h4>Technologies:</h4>
                      <div class="tech-chips">
                        @for (tech of project.technologies; track tech) {
                          <span class="tech-chip">{{ tech }}</span>
                        }
                      </div>
                    </div>
                  }
                  
                  @if (project.achievements.length > 0) {
                    <div class="achievements">
                      <h4>Key Achievements:</h4>
                      <ul>
                        @for (achievement of project.achievements; track achievement) {
                          <li>{{ achievement }}</li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              </div>
            }
          </div>
          
          <div class="add-button-container">
            <button mat-raised-button color="primary" (click)="addProject()">
              <mat-icon>add</mat-icon>
              Add Another Project
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
    
    .projects-list {
      margin-bottom: 24px;
    }
    
    .project-item {
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      padding: 24px;
      margin-bottom: 16px;
      background-color: #fafafa;
    }
    
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 16px;
    }
    
    .project-title h3 {
      margin: 0 0 8px 0;
      font-size: 18px;
      font-weight: 500;
    }
    
    .role {
      margin: 0 0 4px 0;
      color: #666;
      font-weight: 500;
    }
    
    .dates {
      margin: 0;
      color: #999;
      font-size: 14px;
    }
    
    .description {
      margin: 0 0 16px 0;
      line-height: 1.6;
    }
    
    .project-links {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .project-link {
      display: flex;
      align-items: center;
      gap: 4px;
      color: #1976d2;
      text-decoration: none;
      font-size: 14px;
    }
    
    .project-link:hover {
      text-decoration: underline;
    }
    
    .technologies h4,
    .achievements h4 {
      margin: 0 0 8px 0;
      font-size: 14px;
      font-weight: 500;
      color: #333;
    }
    
    .tech-chips {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }
    
    .tech-chip {
      background-color: #e3f2fd;
      color: #1976d2;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }
    
    .achievements ul {
      margin: 0;
      padding-left: 20px;
    }
    
    .achievements li {
      margin-bottom: 4px;
    }
    
    .add-button-container {
      text-align: center;
      margin-top: 24px;
    }
  `]
})
export class ProjectsEditorComponent {
  private resumeState = inject(ResumeStateService);
  
  projects = this.resumeState.projects;

  addProject() {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      name: 'New Project',
      description: 'Project description...',
      startDate: new Date().toISOString().substr(0, 7),
      endDate: null,
      isOngoing: true,
      technologies: [],
      achievements: [],
      role: 'Developer'
    };
    
    this.resumeState.addProject(newProject);
  }

  removeProject(projectId: string) {
    this.resumeState.removeProject(projectId);
  }
}