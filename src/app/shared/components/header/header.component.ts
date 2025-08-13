import { Component, Output, EventEmitter } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ExportService } from '../../../core/services/export.service';
import { ResumeStateService } from '../../../core/services/resume-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(
    private exportService: ExportService,
    private resumeState: ResumeStateService
  ) {}

  onToggleSidebar(): void {
    this.toggleSidebar.emit();
  }

  async onExportPdf(): Promise<void> {
    const resume = this.resumeState.resume();
    if (resume) {
      await this.exportService.exportToPdf(resume);
    }
  }

  async onExportDocx(): Promise<void> {
    const resume = this.resumeState.resume();
    if (resume) {
      await this.exportService.exportToDocx(resume);
    }
  }

  onExportText(): void {
    const resume = this.resumeState.resume();
    if (resume) {
      const text = this.exportService.exportToPlainText(resume);
      const blob = new Blob([text], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }
  }
}
