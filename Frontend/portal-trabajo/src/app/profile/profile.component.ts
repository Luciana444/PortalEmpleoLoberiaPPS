import { Component, Inject, Input, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { AppUtils } from '../../utils/app.utils';
import { Profile } from '../../models/profile.model';
import { jwtDecode } from 'jwt-decode';
import { User } from '../profile-form/profile-form.component';
import { isPlatformBrowser } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private router: Router,
    private userservice: UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit(): void {
    console.log("profile alive")
    const userType = this.getUserType();

    this.userservice.getDataProfile(userType)?.subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
          console.log(this.user.imagen_url)
        } else {
          console.log('Profile load failed', response);
        }
      },
      error: (err) => {
        console.error('Profile load error', err);
      }
    });
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

  user: Profile = {} as Profile;

  @Input() employeeData: Employee | null = null;

  navigateToEditProfile() {
    this.router.navigate(['/edit-profile']);
  }

  convertToLocalDate(date: string | undefined) {
    if (date) {
      return AppUtils.convertToLocalString(date);
    }
    return "";
  }
   getImageUrl(image_url:string){
    return image_url ? `http://localhost:3000${image_url}` : null;
  }


}

