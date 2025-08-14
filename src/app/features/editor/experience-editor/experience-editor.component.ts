import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { WorkExperience } from '../../../core/models';

@Component({
  selector: 'app-experience-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatChipsModule
  ],
  templateUrl: './experience-editor.component.html',
  styleUrl: './experience-editor.component.scss'
})
export class ExperienceEditorComponent implements OnInit {
  experienceForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeState: ResumeStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentData();
  }

  private initializeForm(): void {
    this.experienceForm = this.fb.group({
      experiences: this.fb.array([])
    });
  }

  get experiences(): FormArray {
    return this.experienceForm.get('experiences') as FormArray;
  }

  addExperience(): void {
    const experienceGroup = this.createExperienceGroup();
    this.experiences.push(experienceGroup);
  }

  removeExperience(index: number): void {
    const experienceId = this.experiences.at(index).get('id')?.value;
    if (experienceId) {
      this.resumeState.removeWorkExperience(experienceId);
    }
    this.experiences.removeAt(index);
  }

  private createExperienceGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      company: ['', Validators.required],
      position: ['', Validators.required],
      location: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: [''],
      isCurrent: [false],
      description: this.fb.array([this.fb.control('')]),
      achievements: this.fb.array([]),
      technologies: this.fb.array([])
    });
  }

  getDescriptionArray(experienceIndex: number): FormArray {
    return this.experiences.at(experienceIndex).get('description') as FormArray;
  }

  addDescription(experienceIndex: number): void {
    const descriptions = this.getDescriptionArray(experienceIndex);
    descriptions.push(this.fb.control(''));
  }

  removeDescription(experienceIndex: number, descIndex: number): void {
    const descriptions = this.getDescriptionArray(experienceIndex);
    descriptions.removeAt(descIndex);
  }

  onCurrentJobChange(experienceIndex: number, isCurrent: boolean): void {
    const experienceGroup = this.experiences.at(experienceIndex);
    if (isCurrent) {
      experienceGroup.get('endDate')?.setValue('');
      experienceGroup.get('endDate')?.disable();
    } else {
      experienceGroup.get('endDate')?.enable();
    }
  }

  saveExperience(experienceIndex: number): void {
    const experienceGroup = this.experiences.at(experienceIndex);
    if (experienceGroup.valid) {
      const experience = experienceGroup.value;
      
      // Convert string dates to Date objects
      experience.startDate = new Date(experience.startDate);
      if (experience.endDate) {
        experience.endDate = new Date(experience.endDate);
      }

      // Filter out empty descriptions
      experience.description = experience.description.filter((desc: string) => desc.trim());

      if (experience.id) {
        this.resumeState.updateWorkExperience(experience.id, experience);
      } else {
        this.resumeState.addWorkExperience(experience);
        // Update the form with the generated ID
        experienceGroup.get('id')?.setValue(this.resumeState.workExperience().find(exp => 
          exp.company === experience.company && exp.position === experience.position
        )?.id);
      }
    }
  }

  private loadCurrentData(): void {
    const currentExperiences = this.resumeState.workExperience();
    currentExperiences.forEach(exp => {
      const experienceGroup = this.createExperienceGroup();
      
      // Convert Date objects to strings for form inputs
      const formValue = {
        ...exp,
        startDate: exp.startDate.toISOString().split('T')[0],
        endDate: exp.endDate ? exp.endDate.toISOString().split('T')[0] : ''
      };
      
      experienceGroup.patchValue(formValue);
      
      // Set descriptions
      const descArray = experienceGroup.get('description') as FormArray;
      descArray.clear();
      exp.description.forEach(desc => {
        descArray.push(this.fb.control(desc));
      });
      
      this.experiences.push(experienceGroup);
    });

    // Add an empty experience if none exist
    if (this.experiences.length === 0) {
      this.addExperience();
    }
  }
}
