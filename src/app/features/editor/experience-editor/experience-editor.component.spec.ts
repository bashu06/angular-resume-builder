import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceEditorComponent } from './experience-editor.component';

describe('ExperienceEditorComponent', () => {
  let component: ExperienceEditorComponent;
  let fixture: ComponentFixture<ExperienceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
