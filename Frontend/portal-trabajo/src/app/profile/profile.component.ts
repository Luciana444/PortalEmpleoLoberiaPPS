import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  constructor(private router: Router) { }

  @Input() employeeData: Employee | null = null;

  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

}

