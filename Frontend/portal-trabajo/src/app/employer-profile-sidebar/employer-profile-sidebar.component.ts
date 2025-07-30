import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employer } from '../../models/employer.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employer-profile-sidebar',
  imports: [],
  templateUrl: './employer-profile-sidebar.component.html',
  styleUrl: './employer-profile-sidebar.component.scss'
})
export class EmployerProfileSidebarComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient, private authService: AuthService,
  ) { }

  url = 'http://localhost:3000/api/empresa/datos';
  employer: Employer = {} as Employer;
  isOwnProfile: boolean = false;

  @Input()
  currentUserId: string | null = null;
  @Input()
  currentUserType: string | null = null;
  @Input()
  itemId: string = '';

  ngOnInit(): void {
    //flagueo estar en mi propio perfil
    if (this.currentUserId === this.itemId || (this.itemId === '' && this.currentUserType === 'empresa'))
      this.isOwnProfile = true;

    if (this.isOwnProfile) {
      this.getCurrentProfile();
    } else {
      //TODO: preguntar a back si podemos tener un endpoint asi:
      this.getProfileById();
    }
  }

  private getProfileById() {
    this.http.get<Employer>(`${this.url}/${this.itemId}`)
      .subscribe({
        next: (response) => {
          this.employer = response;
        },
        error: (err) => {
          console.error('Error loading employer profile:', err);
          this.employer;
        }
      });
  }


  getCurrentProfile() {
    this.http.get<Employer>(this.url)
      .subscribe({
        next: (response) => {
          this.employer = response;
        },
        error: (err) => {
          console.error('Error loading employer profile:', err);
          this.employer;
        }
      });
  }

  navigateToEditProfile() {
    this.router.navigate(['/edit-profile-employer']);
  }

  navigateToLanding() {
    this.router.navigate(['/']);
  }

  getImageUrl(logo: string) {
    return logo ? `http://localhost:3000${logo}` : null;
  }
}
