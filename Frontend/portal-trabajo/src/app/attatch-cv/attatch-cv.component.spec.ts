import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttatchCvComponent } from './attatch-cv.component';

describe('AttatchCvComponent', () => {
  let component: AttatchCvComponent;
  let fixture: ComponentFixture<AttatchCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttatchCvComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AttatchCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
