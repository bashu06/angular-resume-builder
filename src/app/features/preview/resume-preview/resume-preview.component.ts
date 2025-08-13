import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { ResumeStateService } from '../../../core/services/resume-state.service';

@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatDividerModule],
  template: `
    <div class="preview-container">
      @if (hasData()) {
        <div class="resume-page">
          <!-- Header Section -->
          @if (personalInfo(); as info) {
            <div class="header-section">
              <div class="name-title">
                <h1 class="full-name">{{ info.fullName }}</h1>
                @if (info.jobTitle) {
                  <h2 class="job-title">{{ info.jobTitle }}</h2>
                }
              </div>
              
              <div class="contact-info">
                <div class="contact-row">
                  @if (info.email) {
                    <div class="contact-item">
                      <mat-icon>email</mat-icon>
                      <span>{{ info.email }}</span>
                    </div>
                  }
                  @if (info.phone) {
                    <div class="contact-item">
                      <mat-icon>phone</mat-icon>
                      <span>{{ info.phone }}</span>
                    </div>
                  }
                </div>
                
                <div class="contact-row">
                  @if (info.address || info.city || info.state) {
                    <div class="contact-item">
                      <mat-icon>location_on</mat-icon>
                      <span>
                        {{ getFormattedAddress(info) }}
                        @if (info.zipCode) { {{ info.zipCode }} }
                      </span>
                    </div>
                  }
                </div>
                
                @if (info.website || info.linkedin || info.github) {
                  <div class="contact-row">
                    @if (info.website) {
                      <div class="contact-item">
                        <mat-icon>language</mat-icon>
                        <span>{{ info.website }}</span>
                      </div>
                    }
                    @if (info.linkedin) {
                      <div class="contact-item">
                        <mat-icon>person</mat-icon>
                        <span>LinkedIn</span>
                      </div>
                    }
                    @if (info.github) {
                      <div class="contact-item">
                        <mat-icon>code</mat-icon>
                        <span>GitHub</span>
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          }

          @if (personalInfo()?.summary) {
            <mat-divider></mat-divider>
            <div class="section">
              <h3 class="section-title">Professional Summary</h3>
              <p class="summary">{{ personalInfo()?.summary }}</p>
            </div>
          }

          <!-- Work Experience -->
          @if (workExperience().length > 0) {
            <mat-divider></mat-divider>
            <div class="section">
              <h3 class="section-title">Professional Experience</h3>
              @for (exp of workExperience(); track exp.id) {
                <div class="experience-item">
                  <div class="item-header">
                    <div class="item-title">
                      <h4>{{ exp.jobTitle }}</h4>
                      <h5>{{ exp.company }} • {{ exp.location }}</h5>
                    </div>
                    <div class="item-date">
                      {{ exp.startDate }} - {{ exp.isCurrentJob ? 'Present' : exp.endDate }}
                    </div>
                  </div>
                  
                  <p class="item-description">{{ exp.description }}</p>
                  
                  @if (exp.achievements.length > 0) {
                    <ul class="achievements">
                      @for (achievement of exp.achievements; track achievement) {
                        <li>{{ achievement }}</li>
                      }
                    </ul>
                  }
                  
                  @if (exp.technologies && exp.technologies.length > 0) {
                    <div class="technologies">
                      <strong>Technologies:</strong> {{ exp.technologies.join(', ') }}
                    </div>
                  }
                </div>
              }
            </div>
          }

          <!-- Education -->
          @if (education().length > 0) {
            <mat-divider></mat-divider>
            <div class="section">
              <h3 class="section-title">Education</h3>
              @for (edu of education(); track edu.id) {
                <div class="education-item">
                  <div class="item-header">
                    <div class="item-title">
                      <h4>{{ edu.degree }} in {{ edu.field }}</h4>
                      <h5>{{ edu.institution }} • {{ edu.location }}</h5>
                    </div>
                    <div class="item-date">
                      {{ edu.startDate }} - {{ edu.isCurrentlyEnrolled ? 'Present' : edu.endDate }}
                    </div>
                  </div>
                  
                  @if (edu.gpa) {
                    <p class="gpa">GPA: {{ edu.gpa }}</p>
                  }
                  
                  @if (edu.honors) {
                    <p class="honors">{{ edu.honors }}</p>
                  }
                  
                  @if (edu.relevantCourses && edu.relevantCourses.length > 0) {
                    <div class="courses">
                      <strong>Relevant Courses:</strong> {{ edu.relevantCourses.join(', ') }}
                    </div>
                  }
                </div>
              }
            </div>
          }

          <!-- Skills -->
          @if (skills().length > 0) {
            <mat-divider></mat-divider>
            <div class="section">
              <h3 class="section-title">Skills</h3>
              <div class="skills-section">
                @for (category of skillCategories; track category) {
                  @if (getSkillsByCategory(category).length > 0) {
                    <div class="skill-category">
                      <h4 class="skill-category-title">{{ category }}</h4>
                      <div class="skills-list">
                        @for (skill of getSkillsByCategory(category); track skill.id) {
                          <span class="skill-item">
                            {{ skill.name }}
                            <span class="skill-level">({{ skill.level }})</span>
                          </span>
                        }
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          }

          <!-- Projects -->
          @if (projects().length > 0) {
            <mat-divider></mat-divider>
            <div class="section">
              <h3 class="section-title">Projects</h3>
              @for (project of projects(); track project.id) {
                <div class="project-item">
                  <div class="item-header">
                    <div class="item-title">
                      <h4>{{ project.name }}</h4>
                      <h5>{{ project.role }}</h5>
                    </div>
                    <div class="item-date">
                      {{ project.startDate }} - {{ project.isOngoing ? 'Ongoing' : project.endDate }}
                    </div>
                  </div>
                  
                  <p class="item-description">{{ project.description }}</p>
                  
                  @if (project.technologies.length > 0) {
                    <div class="technologies">
                      <strong>Technologies:</strong> {{ project.technologies.join(', ') }}
                    </div>
                  }
                  
                  @if (project.achievements.length > 0) {
                    <ul class="achievements">
                      @for (achievement of project.achievements; track achievement) {
                        <li>{{ achievement }}</li>
                      }
                    </ul>
                  }
                </div>
              }
            </div>
          }
        </div>
      } @else {
        <div class="empty-preview">
          <mat-icon class="empty-icon">description</mat-icon>
          <h2>Resume Preview</h2>
          <p>Start adding your information to see a live preview of your resume.</p>
        </div>
      }
    </div>
  `,
  styles: [`
    .preview-container { padding: 24px; background: #f5f5f5; min-height: 100%; }
    .resume-page { max-width: 8.5in; width: 100%; margin: 0 auto; background: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 40px; font-family: 'Roboto', sans-serif; line-height: 1.6; color: #333; }
    .empty-preview { text-align: center; padding: 80px 40px; color: #666; }
    .empty-icon { font-size: 80px; width: 80px; height: 80px; color: #ccc; margin-bottom: 16px; }
    .header-section { margin-bottom: 32px; }
    .name-title { text-align: center; margin-bottom: 24px; }
    .full-name { font-size: 36px; font-weight: 300; margin: 0 0 8px 0; color: #1976d2; }
    .job-title { font-size: 18px; font-weight: 400; margin: 0; color: #666; }
    .contact-info { text-align: center; }
    .contact-row { display: flex; justify-content: center; flex-wrap: wrap; gap: 24px; margin-bottom: 8px; }
    .contact-item { display: flex; align-items: center; gap: 4px; font-size: 14px; }
    .contact-item mat-icon { font-size: 16px; width: 16px; height: 16px; color: #666; }
    .section { margin: 32px 0; }
    .section-title { font-size: 20px; font-weight: 500; color: #1976d2; margin: 0 0 20px 0; padding-bottom: 8px; border-bottom: 2px solid #e3f2fd; }
    .summary { margin: 0; text-align: justify; }
    .experience-item, .education-item, .project-item { margin-bottom: 24px; }
    .item-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px; }
    .item-title h4 { font-size: 16px; font-weight: 500; margin: 0 0 4px 0; color: #333; }
    .item-title h5 { font-size: 14px; font-weight: 400; margin: 0; color: #666; }
    .item-date { font-size: 14px; color: #999; white-space: nowrap; }
    .item-description { margin: 0 0 12px 0; text-align: justify; }
    .achievements { margin: 0 0 12px 0; padding-left: 20px; }
    .achievements li { margin-bottom: 4px; }
    .technologies, .courses { font-size: 14px; color: #666; margin-bottom: 8px; }
    .gpa, .honors { margin: 0 0 8px 0; font-style: italic; color: #666; }
    .skills-section { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; }
    .skill-category-title { font-size: 14px; font-weight: 500; margin: 0 0 8px 0; color: #333; }
    .skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .skill-item { font-size: 14px; color: #333; }
    .skill-level { color: #666; font-size: 12px; }
    mat-divider { margin: 24px 0; }
    @media print { .preview-container { padding: 0; background: white; } .resume-page { box-shadow: none; padding: 20px; } }
  `]
})
export class ResumePreviewComponent {
  private resumeState = inject(ResumeStateService);

  personalInfo = this.resumeState.personalInfo;
  workExperience = this.resumeState.workExperience;
  education = this.resumeState.education;
  skills = this.resumeState.skills;
  projects = this.resumeState.projects;
  hasData = this.resumeState.hasData;

  skillCategories = ['Technical', 'Framework', 'Tool', 'Language', 'Soft'];

  getSkillsByCategory(category: string) {
    return this.skills().filter(skill => skill.category === category);
  }

  getFormattedAddress(info: any): string {
    return [info.address, info.city, info.state].filter(val => !!val).join(', ');
  }
}