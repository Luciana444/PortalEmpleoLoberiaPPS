import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostulationListComponent } from './postulation-list.component';

describe('PostulationListComponent', () => {
  let component: PostulationListComponent;
  let fixture: ComponentFixture<PostulationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostulationListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostulationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
