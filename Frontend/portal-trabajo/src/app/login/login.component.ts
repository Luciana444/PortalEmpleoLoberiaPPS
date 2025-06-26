import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) {}

  goToEmployeeForm(event: Event) {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/employee-form']);
  }
}