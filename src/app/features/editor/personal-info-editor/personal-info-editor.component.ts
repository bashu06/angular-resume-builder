import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { PersonalInfo } from '../../../core/models';

@Component({
  selector: 'app-personal-info-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule
  ],
  templateUrl: './personal-info-editor.component.html',
  styleUrl: './personal-info-editor.component.scss'
})
export class PersonalInfoEditorComponent implements OnInit {
  personalInfoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private resumeState: ResumeStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentData();
  }

  private initializeForm(): void {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      country: [''],
      website: [''],
      linkedin: [''],
      github: [''],
      portfolio: [''],
      summary: ['', Validators.required]
    });

    // Auto-save on form changes
    this.personalInfoForm.valueChanges.subscribe(value => {
      if (this.personalInfoForm.valid) {
        this.savePersonalInfo();
      }
    });
  }

  private loadCurrentData(): void {
    const currentPersonalInfo = this.resumeState.personalInfo();
    if (currentPersonalInfo) {
      this.personalInfoForm.patchValue(currentPersonalInfo);
    }
  }

  savePersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      const personalInfo: Partial<PersonalInfo> = this.personalInfoForm.value;
      this.resumeState.updatePersonalInfo(personalInfo);
    }
  }
}
