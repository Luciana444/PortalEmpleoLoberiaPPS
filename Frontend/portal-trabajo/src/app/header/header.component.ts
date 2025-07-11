import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private userservice: UserService) { }

  item: string = 'token';

  user = {
    profilePicture: 0,
    name: 'Juana',
    surname: 'Perez',
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToFormSelector() {
    this.router.navigate(['/form-selector']);
  }

  get isLoggedIn(): boolean {
    return !!localStorage.getItem(this.item);
  }

  onLogout() {
    this.userservice.logout();
    this.navigateToLogin();
  }

}
