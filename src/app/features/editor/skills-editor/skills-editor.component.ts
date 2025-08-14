import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ResumeStateService } from '../../../core/services/resume-state.service';
import { Skill } from '../../../core/models';

@Component({
  selector: 'app-skills-editor',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './skills-editor.component.html',
  styleUrl: './skills-editor.component.scss'
})
export class SkillsEditorComponent implements OnInit {
  skillsForm!: FormGroup;
  
  skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  skillCategories = ['Technical', 'Language', 'Soft', 'Tools', 'Frameworks', 'Other'];

  constructor(
    private fb: FormBuilder,
    private resumeState: ResumeStateService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCurrentData();
  }

  private initializeForm(): void {
    this.skillsForm = this.fb.group({
      skills: this.fb.array([])
    });
  }

  get skills(): FormArray {
    return this.skillsForm.get('skills') as FormArray;
  }

  addSkill(): void {
    const skillGroup = this.createSkillGroup();
    this.skills.push(skillGroup);
  }

  removeSkill(index: number): void {
    const skillId = this.skills.at(index).get('id')?.value;
    if (skillId) {
      this.resumeState.removeSkill(skillId);
    }
    this.skills.removeAt(index);
  }

  private createSkillGroup(): FormGroup {
    return this.fb.group({
      id: [''],
      name: ['', Validators.required],
      level: ['Intermediate', Validators.required],
      category: ['Technical', Validators.required],
      yearsOfExperience: [1]
    });
  }

  saveSkill(skillIndex: number): void {
    const skillGroup = this.skills.at(skillIndex);
    if (skillGroup.valid) {
      const skill = skillGroup.value;

      if (skill.id) {
        this.resumeState.updateSkill(skill.id, skill);
      } else {
        this.resumeState.addSkill(skill);
        // Update the form with the generated ID
        skillGroup.get('id')?.setValue(this.resumeState.skills().find(s => 
          s.name === skill.name && s.category === skill.category
        )?.id);
      }
    }
  }

  private loadCurrentData(): void {
    const currentSkills = this.resumeState.skills();
    currentSkills.forEach(skill => {
      const skillGroup = this.createSkillGroup();
      skillGroup.patchValue(skill);
      this.skills.push(skillGroup);
    });

    // Add an empty skill if none exist
    if (this.skills.length === 0) {
      this.addSkill();
    }
  }
}
