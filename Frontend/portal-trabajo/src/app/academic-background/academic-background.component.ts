import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-academic-background',
  imports: [],
  templateUrl: './academic-background.component.html',
  styleUrl: './academic-background.component.scss'
})
export class AcademicBackgroundComponent {
  constructor(private router: Router) { }

  navigateToAcademicBackgroundEditComponent() {
    this.router.navigate(['/academic-background-edit']);
  }

  navigateToWorkExperience() {
    this.router.navigate(['/work-experience']);
  }
}
