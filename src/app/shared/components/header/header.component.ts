import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { ResumeStateService } from '../../../core/services/resume-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  template: `
    <mat-toolbar color="primary">
      <mat-icon>description</mat-icon>
      <span class="title">Resume Builder</span>
      
      <div class="spacer"></div>
      
      <button mat-button (click)="navigateToBuilder()">
        <mat-icon>edit</mat-icon>
        Edit
      </button>
      
      <button mat-button (click)="navigateToPreview()">
        <mat-icon>visibility</mat-icon>
        Preview
      </button>
      
      <button mat-button (click)="loadSampleData()">
        <mat-icon>auto_awesome</mat-icon>
        Sample Data
      </button>
      
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>more_vert</mat-icon>
      </button>
      
      <mat-menu #menu="matMenu">
        <button mat-menu-item>
          <mat-icon>download</mat-icon>
          <span>Export PDF</span>
        </button>
        <button mat-menu-item>
          <mat-icon>save</mat-icon>
          <span>Save</span>
        </button>
        <button mat-menu-item>
          <mat-icon>upload</mat-icon>
          <span>Load</span>
        </button>
      </mat-menu>
    </mat-toolbar>
  `,
  styles: [`
    .title {
      margin-left: 8px;
      font-weight: 500;
    }
    
    .spacer {
      flex: 1 1 auto;
    }
    
    button {
      margin-left: 8px;
    }
  `]
})
export class HeaderComponent {
  private router = inject(Router);
  private resumeState = inject(ResumeStateService);

  navigateToBuilder() {
    this.router.navigate(['/builder']);
  }

  navigateToPreview() {
    this.router.navigate(['/preview']);
  }

  loadSampleData() {
    this.resumeState.loadSampleData();
  }
}