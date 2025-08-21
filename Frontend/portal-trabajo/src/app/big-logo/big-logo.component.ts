import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouteTranslationService } from '../services/route-translation.service';

@Component({
  selector: 'app-big-logo',
  imports: [],
  templateUrl: './big-logo.component.html',
  styleUrl: './big-logo.component.scss'
})
export class BigLogoComponent {
  constructor(private router: Router, private routeTranslation: RouteTranslationService,) { }

  navigateToLanding() {
    this.routeTranslation.navigateToTranslated(['']);
  }
}
