import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingLinkComponent } from './training-link.component';

describe('TrainingLinkComponent', () => {
  let component: TrainingLinkComponent;
  let fixture: ComponentFixture<TrainingLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingLinkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
