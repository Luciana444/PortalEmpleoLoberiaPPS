import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulateDialogComponent } from './postulate-dialog.component';

describe('PostulateDialogComponent', () => {
  let component: PostulateDialogComponent;
  let fixture: ComponentFixture<PostulateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});