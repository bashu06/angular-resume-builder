import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Resume } from '../models';

export interface ResumeRecord {
  id: string;
  name: string;
  data: Resume;
  created: Date;
  lastModified: Date;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService extends Dexie {
  resumes!: Table<ResumeRecord>;

  constructor() {
    super('ResumeBuilderDB');
    this.version(1).stores({
      resumes: 'id, name, created, lastModified'
    });
  }

  async saveResume(resume: Resume, name?: string): Promise<string> {
    const record: ResumeRecord = {
      id: resume.id,
      name: name || this.generateResumeName(resume),
      data: resume,
      created: new Date(),
      lastModified: new Date()
    };

    await this.resumes.put(record);
    return record.id;
  }

  async loadResume(id: string): Promise<Resume | undefined> {
    const record = await this.resumes.get(id);
    return record?.data;
  }

  async getAllResumes(): Promise<ResumeRecord[]> {
    return await this.resumes.orderBy('lastModified').reverse().toArray();
  }

  async deleteResume(id: string): Promise<void> {
    await this.resumes.delete(id);
  }

  async updateResumeName(id: string, name: string): Promise<void> {
    await this.resumes.update(id, { name, lastModified: new Date() });
  }

  async exportData(): Promise<string> {
    const allResumes = await this.getAllResumes();
    return JSON.stringify(allResumes, null, 2);
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const data = JSON.parse(jsonData) as ResumeRecord[];
      await this.resumes.bulkPut(data);
    } catch (error) {
      throw new Error('Invalid import data format');
    }
  }

  private generateResumeName(resume: Resume): string {
    const { firstName, lastName } = resume.personalInfo;
    const name = `${firstName} ${lastName}`.trim();
    return name || 'Untitled Resume';
  }

  async clearAllData(): Promise<void> {
    await this.resumes.clear();
  }
}