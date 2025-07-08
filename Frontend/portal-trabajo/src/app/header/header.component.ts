import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  imports: [
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private router: Router, private http: HttpClient, private userservice: UserService) { }

  item: string = 'token';
  url: string = 'http://localhost:3000/api/usuario';

  //TODO: mock api
  user = {
    profilePicture: 0,
    name: 'Juana',
    surname: 'Perez',
  }

  ngOnInit() {
    this.getData();
    //TODO: asignar valores correctos a user
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

  public getData() {
    //TODO: llamar al http correcto;
    let usuarios = this.http.get(this.url)
      .subscribe(
        (response: any) => {
          console.log(response);
        }
      );
  }

 onLogout() {
    this.userservice.logout();
    this.navigateToLogin();
  }

}
