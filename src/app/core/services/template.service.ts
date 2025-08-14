import { Injectable } from '@angular/core';
import { ResumeTemplate } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {
  private templates: ResumeTemplate[] = [
    {
      id: 'default',
      name: 'Classic Professional',
      description: 'Clean, professional layout perfect for traditional industries',
      thumbnail: 'assets/templates/classic-thumb.png',
      isDefault: true,
      atsOptimized: true,
      colorScheme: {
        primary: '#2c3e50',
        secondary: '#34495e',
        accent: '#3498db',
        text: '#2c3e50',
        background: '#ffffff'
      },
      layout: 'single-column'
    },
    {
      id: 'modern',
      name: 'Modern Creative',
      description: 'Contemporary design with accent colors for creative fields',
      thumbnail: 'assets/templates/modern-thumb.png',
      isDefault: false,
      atsOptimized: true,
      colorScheme: {
        primary: '#1a237e',
        secondary: '#3f51b5',
        accent: '#ff4081',
        text: '#212121',
        background: '#fafafa'
      },
      layout: 'two-column'
    },
    {
      id: 'minimal',
      name: 'Minimal Clean',
      description: 'Ultra-clean minimal design focusing on content',
      thumbnail: 'assets/templates/minimal-thumb.png',
      isDefault: false,
      atsOptimized: true,
      colorScheme: {
        primary: '#000000',
        secondary: '#424242',
        accent: '#757575',
        text: '#212121',
        background: '#ffffff'
      },
      layout: 'single-column'
    },
    {
      id: 'tech',
      name: 'Tech Industry',
      description: 'Bold design optimized for technology professionals',
      thumbnail: 'assets/templates/tech-thumb.png',
      isDefault: false,
      atsOptimized: true,
      colorScheme: {
        primary: '#0d47a1',
        secondary: '#1976d2',
        accent: '#00e676',
        text: '#263238',
        background: '#ffffff'
      },
      layout: 'two-column'
    }
  ];

  getAllTemplates(): ResumeTemplate[] {
    return [...this.templates];
  }

  getTemplate(id: string): ResumeTemplate | undefined {
    return this.templates.find(template => template.id === id);
  }

  getDefaultTemplate(): ResumeTemplate {
    return this.templates.find(template => template.isDefault) || this.templates[0];
  }

  getATSOptimizedTemplates(): ResumeTemplate[] {
    return this.templates.filter(template => template.atsOptimized);
  }

  getTemplatesByLayout(layout: ResumeTemplate['layout']): ResumeTemplate[] {
    return this.templates.filter(template => template.layout === layout);
  }
}