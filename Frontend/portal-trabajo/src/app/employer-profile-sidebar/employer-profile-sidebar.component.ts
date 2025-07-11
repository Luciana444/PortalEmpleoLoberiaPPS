import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-profile-sidebar',
  imports: [],
  templateUrl: './employer-profile-sidebar.component.html',
  styleUrl: './employer-profile-sidebar.component.scss'
})
export class EmployerProfileSidebarComponent {
  constructor(private router: Router) { }


   navigateToEditProfile() {
    this.router.navigate(['/edit-profile-employer']);
  }

}
