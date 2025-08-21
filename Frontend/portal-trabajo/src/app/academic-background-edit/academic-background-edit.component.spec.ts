import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicBackgroundEditComponent } from './academic-background-edit.component';

describe('AcademicBackgroundEditComponent', () => {
  let component: AcademicBackgroundEditComponent;
  let fixture: ComponentFixture<AcademicBackgroundEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcademicBackgroundEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcademicBackgroundEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});