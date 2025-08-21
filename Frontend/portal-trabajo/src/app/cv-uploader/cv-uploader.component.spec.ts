import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvUploaderComponent } from './cv-uploader.component';

describe('CvUploaderComponent', () => {
  let component: CvUploaderComponent;
  let fixture: ComponentFixture<CvUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvUploaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});