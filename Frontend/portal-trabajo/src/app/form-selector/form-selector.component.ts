import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTranslationService } from '../services/route-translation.service';

@Component({
  selector: 'app-form-selector',
  imports: [],
  templateUrl: './form-selector.component.html',
  styleUrl: './form-selector.component.scss'
})
export class FormSelectorComponent {
  constructor(private routeTranslation: RouteTranslationService) { }

  navigateToEmployeeForm() {
    this.routeTranslation.navigateToTranslated(['register-user']);
  }

}


