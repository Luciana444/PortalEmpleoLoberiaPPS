import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeerProfileFormComponent } from './employeer-profile-form.component';

describe('EmployeeProfileFormComponent', () => {
  let component: EmployeerProfileFormComponent;
  let fixture: ComponentFixture<EmployeerProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeerProfileFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeerProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});