import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Employer } from '../../models/employer.model';

@Component({
  selector: 'app-employer-profile-sidebar',
  imports: [],
  templateUrl: './employer-profile-sidebar.component.html',
  styleUrl: './employer-profile-sidebar.component.scss'
})
export class EmployerProfileSidebarComponent {
  constructor(private router: Router, private http: HttpClient) { }

  url = 'http://localhost:3000/api/empresa/datos';

  employer: Employer = {} as Employer;

  navigateToEditProfile() {
    this.router.navigate(['/edit-profile-employer']);
  }

  getProfile() {
    this.http.get<Employer>(this.url)
      .subscribe({
        next: (response) => {
          this.employer = response;
          console.log('Employer loaded:', this.employer);
        },
        error: (err) => {
          console.error('Error loading employer profile:', err);
          this.employer;
        }
      });
  }

}
