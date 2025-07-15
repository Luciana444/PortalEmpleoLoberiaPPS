import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../profile-form/profile-form.component';
import { Profile } from '../../models/profile.model';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-header',
  imports: [

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  user: Profile = {} as Profile;
  itemId: string = "";
  constructor(private route: ActivatedRoute, private router: Router, private userservice: UserService) { }

  ngOnInit(): void {
    this.userservice.getDataProfile(this.getUserType())?.subscribe({
      next: (response) => {
        if (response) { // Populate form with API data
          this.user = response;
        } else {
          console.log('No se pudo cargar el perfil', response);
        }
      },
      error: (err) => {
        //this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al cargar el perfil', err);
      }

    });
  }

  item: string = 'token';


  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/employee-form']);
  }

  navigateToLanding() {
    this.router.navigate(['']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.item);
  }

  onLogout() {
    this.userservice.logout();
    this.navigateToLogin();
  }

  getUserType() {
    const storedTokenString = localStorage.getItem("token") ?? "";
    const decodedToken = jwtDecode<User>(storedTokenString);
    return decodedToken.tipo_usuario;
  }
}




