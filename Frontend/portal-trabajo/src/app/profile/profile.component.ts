import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { AppUtils } from '../../utils/app.utils';
import { Profile } from '../../models/profile.model';
import { jwtDecode } from 'jwt-decode';
import { User } from '../profile-form/profile-form.component';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';
import { EmployeeService } from '../services/employee.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userservice: UserService,
    private employeeservice: EmployeeService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  @Input() employeeData: Employee | null = null;
  user: Profile = {} as Profile;

  itemId: string = "";

  ngOnInit(): void {
    const userType = this.getUserType();
    if (userType === 'empresa') {
      this.itemId = this.route.snapshot.params['id'] ?? "";
      this.employeeservice.getDataProfileForEmployerByPostulationId(this.itemId)?.subscribe({
        next: (response) => {
          if (response) {
            this.user = response;
          } else {
            console.log('Profile load failed', response);
          }
        },
        error: (err) => {
          console.error('Profile load error', err);
        }
      });

    } else if (userType === 'admin') {
      this.itemId = this.route.snapshot.params['id'] ?? "";
      this.employeeservice.getDataProfileForAdminByCiudadanoId(this.itemId)?.subscribe({
        next: (response) => {
          if (response) {
            this.user = response;
          } else {
            console.log('Profile load failed', response);
          }
        },
        error: (err) => {
          console.error('Profile load error', err);
        }
      });
    }
    else {

      this.userservice.getDataProfile(userType)?.subscribe({
        next: (response) => {
          if (response) {
            this.user = response;
          } else {
            console.log('Profile load failed', response);
          }
        },
        error: (err) => {
          console.error('Profile load error', err);
        }
      });
    }
  }

  getUserType(): string | null {
    if (!isPlatformBrowser(this.platformId))
      return null;

    try {
      const storedTokenString = localStorage.getItem("token");
      if (!storedTokenString)
        return null;

      const decodedToken = jwtDecode<User>(storedTokenString);
      return decodedToken.tipo_usuario || null;
    } catch (e) {
      console.error('Token decode error:', e);
      return null;
    }
  }


  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  convertToLocalDate(date: string | undefined) {
    if (date)
      return AppUtils.convertToLocalString(date);

    return "";
  }

  getImageUrl(image_url: string) {
    return image_url ? `${environment.apiUrl}${image_url}` : null;
  }

  navigateToLanding() {
    this.router.navigate(['/']);
  }


}

