import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-selector',
  imports: [],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent {
  constructor(private router: Router) {}

  navigateToEmployeeForm() {
    this.router.navigate(['/register-user']);
  }

}


