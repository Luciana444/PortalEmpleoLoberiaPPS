import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-big-logo',
  imports: [],
  templateUrl: './big-logo.component.html',
  styleUrl: './big-logo.component.scss'
})
export class BigLogoComponent {
  constructor(private router: Router) { }

  navigateToLanding() {
    this.router.navigate(['']);
  }
}
