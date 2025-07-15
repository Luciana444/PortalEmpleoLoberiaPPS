import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-academic-background',
  imports: [],
  templateUrl: './academic-background.component.html',
  styleUrl: './academic-background.component.scss'
})

export class AcademicBackgroundComponent {
  $id: any;
  constructor(private router: Router) { }

  @Input() employeeData: Employee | null = null;

  navigateToAcademicBackgroundEditComponent() {
    this.router.navigate(['/academic-background-edit']);
  }

  navigateToWorkExperience() {
    this.router.navigate(['/work-experience']);
  }
}
