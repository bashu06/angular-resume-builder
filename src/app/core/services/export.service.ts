import { Injectable } from '@angular/core';
import { Resume } from '../models';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';

// Note: pdfMake configuration will be handled differently in production
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  async exportToPdf(resume: Resume): Promise<void> {
    // Temporarily disable PDF export due to build issues
    // const docDefinition = this.generatePdfDefinition(resume);
    // pdfMake.createPdf(docDefinition).download(`${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.pdf`);
    
    console.log('PDF export not yet implemented - use DOCX or text export instead');
    alert('PDF export is temporarily disabled. Please use DOCX or text export instead.');
  }

  async exportToDocx(resume: Resume): Promise<void> {
    const doc = this.generateDocxDocument(resume);
    
    const blob = await Packer.toBlob(doc);
    this.downloadBlob(blob, `${resume.personalInfo.firstName}_${resume.personalInfo.lastName}_Resume.docx`);
  }

  exportToPlainText(resume: Resume): string {
    let text = '';
    
    // Personal Info
    const { personalInfo } = resume;
    text += `${personalInfo.firstName} ${personalInfo.lastName}\n`;
    text += `${personalInfo.email} | ${personalInfo.phone}\n`;
    text += `${personalInfo.address}, ${personalInfo.city}, ${personalInfo.state} ${personalInfo.zipCode}\n`;
    if (personalInfo.website) text += `Website: ${personalInfo.website}\n`;
    if (personalInfo.linkedin) text += `LinkedIn: ${personalInfo.linkedin}\n`;
    text += '\n';

    // Summary
    if (personalInfo.summary) {
      text += 'PROFESSIONAL SUMMARY\n';
      text += '='.repeat(50) + '\n';
      text += `${personalInfo.summary}\n\n`;
    }

    // Work Experience
    if (resume.workExperience.length > 0) {
      text += 'WORK EXPERIENCE\n';
      text += '='.repeat(50) + '\n';
      resume.workExperience.forEach(exp => {
        text += `${exp.position} at ${exp.company}\n`;
        text += `${exp.location} | ${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Present'}\n`;
        exp.description.forEach(desc => text += `• ${desc}\n`);
        text += '\n';
      });
    }

    // Education
    if (resume.education.length > 0) {
      text += 'EDUCATION\n';
      text += '='.repeat(50) + '\n';
      resume.education.forEach(edu => {
        text += `${edu.degree} in ${edu.fieldOfStudy}\n`;
        text += `${edu.institution}, ${edu.location}\n`;
        text += `${this.formatDate(edu.startDate)} - ${edu.endDate ? this.formatDate(edu.endDate) : 'Present'}\n\n`;
      });
    }

    // Skills
    if (resume.skills.length > 0) {
      text += 'SKILLS\n';
      text += '='.repeat(50) + '\n';
      const skillsByCategory = this.groupSkillsByCategory(resume.skills);
      Object.entries(skillsByCategory).forEach(([category, skills]) => {
        text += `${category}: ${skills.map(s => s.name).join(', ')}\n`;
      });
      text += '\n';
    }

    return text;
  }

  private generatePdfDefinition(resume: Resume): any {
    const { personalInfo } = resume;
    
    const content: any[] = [
      // Header
      {
        text: `${personalInfo.firstName} ${personalInfo.lastName}`,
        style: 'header'
      },
      {
        text: `${personalInfo.email} | ${personalInfo.phone}`,
        style: 'subheader'
      },
      {
        text: `${personalInfo.address}, ${personalInfo.city}, ${personalInfo.state} ${personalInfo.zipCode}`,
        style: 'subheader'
      }
    ];

    // Summary
    if (personalInfo.summary) {
      content.push(
        { text: 'Professional Summary', style: 'sectionHeader' },
        { text: personalInfo.summary, style: 'content' }
      );
    }

    // Work Experience
    if (resume.workExperience.length > 0) {
      content.push({ text: 'Work Experience', style: 'sectionHeader' });
      resume.workExperience.forEach(exp => {
        content.push(
          {
            columns: [
              { text: `${exp.position}`, style: 'jobTitle', width: '*' },
              { text: `${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Present'}`, style: 'date', width: 'auto' }
            ]
          },
          { text: `${exp.company}, ${exp.location}`, style: 'company' }
        );
        exp.description.forEach(desc => {
          content.push({ text: `• ${desc}`, style: 'bullet' });
        });
        content.push({ text: ' ', style: 'spacer' });
      });
    }

    // Education
    if (resume.education.length > 0) {
      content.push({ text: 'Education', style: 'sectionHeader' });
      resume.education.forEach(edu => {
        content.push(
          {
            columns: [
              { text: `${edu.degree} in ${edu.fieldOfStudy}`, style: 'degree', width: '*' },
              { text: `${this.formatDate(edu.startDate)} - ${edu.endDate ? this.formatDate(edu.endDate) : 'Present'}`, style: 'date', width: 'auto' }
            ]
          },
          { text: `${edu.institution}, ${edu.location}`, style: 'school' }
        );
      });
    }

    return {
      content,
      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        sectionHeader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5]
        },
        jobTitle: {
          fontSize: 12,
          bold: true
        },
        company: {
          fontSize: 11,
          italics: true,
          margin: [0, 0, 0, 5]
        },
        date: {
          fontSize: 10,
          alignment: 'right'
        },
        bullet: {
          fontSize: 10,
          margin: [0, 2, 0, 2]
        },
        content: {
          fontSize: 11,
          margin: [0, 0, 0, 10]
        },
        spacer: {
          margin: [0, 5, 0, 0]
        }
      }
    };
  }

  private generateDocxDocument(resume: Resume): Document {
    const { personalInfo } = resume;
    
    const children: Paragraph[] = [
      // Header
      new Paragraph({
        children: [
          new TextRun({
            text: `${personalInfo.firstName} ${personalInfo.lastName}`,
            bold: true,
            size: 32
          })
        ],
        heading: HeadingLevel.TITLE
      }),
      new Paragraph({
        children: [
          new TextRun(`${personalInfo.email} | ${personalInfo.phone}`)
        ]
      }),
      new Paragraph({
        children: [
          new TextRun(`${personalInfo.address}, ${personalInfo.city}, ${personalInfo.state} ${personalInfo.zipCode}`)
        ]
      })
    ];

    // Summary
    if (personalInfo.summary) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'Professional Summary', bold: true })],
          heading: HeadingLevel.HEADING_1
        }),
        new Paragraph({
          children: [new TextRun(personalInfo.summary)]
        })
      );
    }

    // Work Experience
    if (resume.workExperience.length > 0) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'Work Experience', bold: true })],
          heading: HeadingLevel.HEADING_1
        })
      );
      
      resume.workExperience.forEach(exp => {
        children.push(
          new Paragraph({
            children: [
              new TextRun({ text: exp.position, bold: true }),
              new TextRun({ text: ` at ${exp.company}` })
            ]
          }),
          new Paragraph({
            children: [
              new TextRun(`${exp.location} | ${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Present'}`)
            ]
          })
        );
        
        exp.description.forEach(desc => {
          children.push(
            new Paragraph({
              children: [new TextRun(`• ${desc}`)]
            })
          );
        });
      });
    }

    return new Document({
      sections: [{
        properties: {},
        children
      }]
    });
  }

  private formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      year: 'numeric'
    }).format(new Date(date));
  }

  private groupSkillsByCategory(skills: any[]): Record<string, any[]> {
    return skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});
  }

  private downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }
}