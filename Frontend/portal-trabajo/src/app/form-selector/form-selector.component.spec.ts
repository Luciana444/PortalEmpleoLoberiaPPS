import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSelectorComponent } from './form-selector.component';

describe('FormSelectorComponent', () => {
  let component: FormSelectorComponent;
  let fixture: ComponentFixture<FormSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
