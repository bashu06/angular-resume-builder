import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { PersonalInfo } from '../../../core/models/personal-info.interface';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-personal-info-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ],
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>Personal Information</mat-card-title>
        <mat-card-subtitle>Basic details and contact information</mat-card-subtitle>
      </mat-card-header>
      
      <mat-card-content>
        <form [formGroup]="personalInfoForm" class="form">
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Full Name</mat-label>
              <input matInput formControlName="fullName" placeholder="John Doe">
              @if (personalInfoForm.get('fullName')?.hasError('required')) {
                <mat-error>Full name is required</mat-error>
              }
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Job Title</mat-label>
              <input matInput formControlName="jobTitle" placeholder="Senior Software Engineer">
            </mat-form-field>
          </div>
          
          <div class="form-row-split">
            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput formControlName="email" type="email" placeholder="john@example.com">
              @if (personalInfoForm.get('email')?.hasError('email')) {
                <mat-error>Please enter a valid email</mat-error>
              }
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>Phone</mat-label>
              <input matInput formControlName="phone" placeholder="+1 (555) 123-4567">
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Address</mat-label>
              <input matInput formControlName="address" placeholder="123 Main Street">
            </mat-form-field>
          </div>
          
          <div class="form-row-split">
            <mat-form-field appearance="outline">
              <mat-label>City</mat-label>
              <input matInput formControlName="city" placeholder="San Francisco">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>State</mat-label>
              <input matInput formControlName="state" placeholder="CA">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>ZIP Code</mat-label>
              <input matInput formControlName="zipCode" placeholder="94105">
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Country</mat-label>
              <input matInput formControlName="country" placeholder="United States">
            </mat-form-field>
          </div>
          
          <div class="form-row-split">
            <mat-form-field appearance="outline">
              <mat-label>Website</mat-label>
              <input matInput formControlName="website" placeholder="https://johndoe.dev">
            </mat-form-field>
            
            <mat-form-field appearance="outline">
              <mat-label>LinkedIn</mat-label>
              <input matInput formControlName="linkedin" placeholder="https://linkedin.com/in/johndoe">
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>GitHub</mat-label>
              <input matInput formControlName="github" placeholder="https://github.com/johndoe">
            </mat-form-field>
          </div>
          
          <div class="form-row">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Professional Summary</mat-label>
              <textarea 
                matInput 
                formControlName="summary" 
                rows="4"
                placeholder="A brief overview of your professional background and key achievements...">
              </textarea>
            </mat-form-field>
          </div>
        </form>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    .form {
      max-width: 100%;
    }
    
    .form-row {
      display: flex;
      width: 100%;
      margin-bottom: 16px;
    }
    
    .form-row-split {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }
    
    .form-row-split mat-form-field {
      flex: 1;
    }
    
    .full-width {
      width: 100%;
    }
    
    mat-card {
      margin-bottom: 24px;
    }
    
    mat-card-header {
      margin-bottom: 16px;
    }
    
    textarea {
      resize: vertical;
      min-height: 100px;
    }
  `]
})
export class PersonalInfoEditorComponent implements OnInit {
  private fb = inject(FormBuilder);
  private resumeState = inject(ResumeStateService);

  personalInfoForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    jobTitle: [''],
    email: ['', [Validators.email]],
    phone: [''],
    address: [''],
    city: [''],
    state: [''],
    zipCode: [''],
    country: [''],
    website: [''],
    linkedin: [''],
    github: [''],
    summary: ['']
  });

  ngOnInit() {
    // Load existing data
    const personalInfo = this.resumeState.personalInfo();
    if (personalInfo) {
      this.personalInfoForm.patchValue(personalInfo);
    }

    // Auto-save on form changes
    this.personalInfoForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.personalInfoForm.valid) {
          this.savePersonalInfo();
        }
      });
  }

  private savePersonalInfo() {
    const currentPersonalInfo = this.resumeState.personalInfo();
    const formValue = this.personalInfoForm.value;
    
    const updatedPersonalInfo: PersonalInfo = {
      id: currentPersonalInfo?.id || 'personal-info-1',
      ...formValue
    };
    
    this.resumeState.updatePersonalInfo(updatedPersonalInfo);
  }
}