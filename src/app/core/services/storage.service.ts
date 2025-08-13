import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Resume } from '../models/resume.interface';

@Injectable({
  providedIn: 'root'
})
export class StorageService extends Dexie {
  resumes!: Table<Resume, string>;

  constructor() {
    super('ResumeBuilderDB');
    
    this.version(1).stores({
      resumes: 'id, personalInfo.fullName, updatedAt, createdAt'
    });
  }

  async saveResume(resume: Resume): Promise<void> {
    try {
      await this.resumes.put(resume);
    } catch (error) {
      console.error('Error saving resume:', error);
      throw new Error('Failed to save resume');
    }
  }

  async getResume(id: string): Promise<Resume | undefined> {
    try {
      return await this.resumes.get(id);
    } catch (error) {
      console.error('Error loading resume:', error);
      throw new Error('Failed to load resume');
    }
  }

  async getAllResumes(): Promise<Resume[]> {
    try {
      return await this.resumes.orderBy('updatedAt').reverse().toArray();
    } catch (error) {
      console.error('Error loading resumes:', error);
      throw new Error('Failed to load resumes');
    }
  }

  async deleteResume(id: string): Promise<void> {
    try {
      await this.resumes.delete(id);
    } catch (error) {
      console.error('Error deleting resume:', error);
      throw new Error('Failed to delete resume');
    }
  }

  async exportData(): Promise<string> {
    try {
      const resumes = await this.getAllResumes();
      return JSON.stringify(resumes, null, 2);
    } catch (error) {
      console.error('Error exporting data:', error);
      throw new Error('Failed to export data');
    }
  }

  async importData(jsonData: string): Promise<void> {
    try {
      const resumes: Resume[] = JSON.parse(jsonData);
      await this.transaction('rw', this.resumes, async () => {
        for (const resume of resumes) {
          await this.resumes.put(resume);
        }
      });
    } catch (error) {
      console.error('Error importing data:', error);
      throw new Error('Failed to import data');
    }
  }

  async clearAllData(): Promise<void> {
    try {
      await this.resumes.clear();
    } catch (error) {
      console.error('Error clearing data:', error);
      throw new Error('Failed to clear data');
    }
  }
}