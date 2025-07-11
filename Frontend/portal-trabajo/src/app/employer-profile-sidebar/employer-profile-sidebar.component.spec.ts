import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerProfileSidebarComponent } from './employer-profile-sidebar.component';

describe('EmployerProfileSidebarComponent', () => {
  let component: EmployerProfileSidebarComponent;
  let fixture: ComponentFixture<EmployerProfileSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerProfileSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployerProfileSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
