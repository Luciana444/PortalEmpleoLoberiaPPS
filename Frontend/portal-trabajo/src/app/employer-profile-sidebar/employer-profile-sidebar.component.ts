import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employer } from '../../models/employer.model';
import { AuthService } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { RouteTranslationService } from '../services/route-translation.service';

@Component({
  selector: 'app-employer-profile-sidebar',
  imports: [],
  templateUrl: './employer-profile-sidebar.component.html',
  styleUrl: './employer-profile-sidebar.component.scss'
})
export class EmployerProfileSidebarComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private routeTranslation: RouteTranslationService
  ) { }

  url = `${environment.apiUrl}/api/empresa/datos`;
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

    if (this.isOwnProfile)
      this.getCurrentProfile();
    else
      this.getProfileById(this.itemId);
  }

  private getProfileById(itemId: string) {
    const urlEmployer = `${environment.apiUrl}/api/empresa/${itemId}/datos_empresa`;

    this.http.get<Employer>(urlEmployer)
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
    this.routeTranslation.navigateToTranslated(['/edit-profile-employer']);
  }

  navigateToLanding() {
    this.routeTranslation.navigateToTranslated(['']);
  }

  getImageUrl(logo: string) {
    return logo ? `${environment.apiUrl}${logo}` : null;
  }
}
