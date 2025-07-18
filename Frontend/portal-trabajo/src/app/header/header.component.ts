import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../profile-form/profile-form.component';
import { Profile } from '../../models/profile.model';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: Profile = {} as Profile;
  itemId: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private userservice: UserService, @Inject(PLATFORM_ID) private platformId: Object) { }


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId))
      this.checkTokenExpiration();

    const userType = this.getUserType();

    if (userType) {
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
    // this.userservice.getDataProfile(this.getUserType())?.subscribe({
    //   next: (response) => {
    //     if (response) { // Populate form with API data
    //       this.user = response;
    //     } else {
    //       console.log('No se pudo cargar el perfil', response);
    //     }
    //   },
    //   error: (err) => {
    //     //this.toastr.error(err.error.error, 'Ocurrió un error');
    //     console.error('Error al cargar el perfil', err);
    //   }

    // });
  }

  item: string = 'token';


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register-user']);
  }

  navigateToLanding() {
    this.router.navigate(['']);
  }
  /*navigateToProfile(){
    this.router.navigate(['/employee-profile']);
    this.router.navigate(['/employeer-profile']);
 }*/
  onLogout() {
    this.userservice.logout();
    this.navigateToLogin();
  }

  get isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {  // Check if running in browser
      return !!localStorage.getItem(this.item);
    }
    return false;  // Default for server-side
  }

  // getUserType() {
  //   if (isPlatformBrowser(this.platformId)) {  // Check if running in browser
  //     const storedTokenString = localStorage.getItem("token") ?? "";
  //     const decodedToken = jwtDecode<User>(storedTokenString);
  //     return decodedToken.tipo_usuario;
  //   }
  //   return null;  // Default for server-side
  // }

  getUserType(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    try {
      const storedTokenString = localStorage.getItem("token");
      if (!storedTokenString) return null;

      const decodedToken = jwtDecode<User>(storedTokenString);
      return decodedToken.tipo_usuario || null;
    } catch (e) {
      console.error('Token decode error:', e);
      return null;
    }
  }

  private checkTokenExpiration(): void {
    if (!isPlatformBrowser(this.platformId)) return;  // Add this line

    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      if (Date.now() >= decoded.exp * 1000) {
        this.onLogout();
      }
    } catch (e) {
      console.error('Token validation failed:', e);
      this.onLogout();
    }
  }

}




