import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { EmployerProfileSidebarComponent } from "../employer-profile-sidebar/employer-profile-sidebar.component";
import { Router, ActivatedRoute } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { DatePipe } from '@angular/common'
import { JobOffer } from '../../models/jobOffer.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-employer-profile',
  imports: [HeaderComponent, FooterComponent, EmployerProfileSidebarComponent, DatePipe],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
})

export class EmployerProfileComponent implements OnInit {
  itemId: string = '';
  offers: JobOffer[] = [];

  constructor(
    private router: Router,
    private employerService: EmployerService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadEmployerOffers();
  }

  //cargo las ofertas del empleador
  loadEmployerOffers(): void {
    this.employerService.getACtiveOffers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const allOffers = response.body ?? [];

          //si veo el perfil de un empleador especifico
          if (this.itemId) {
            this.offers = allOffers.filter(offer => offer.id_empresa === this.itemId);
          } else {
            //si veo mi propio perfil
            const currentEmployerId = this.getCurrentEmployerId();
            this.offers = allOffers.filter(offer => offer.id_empresa === currentEmployerId);
          }
        }
      },
      error: (err) => {
        console.error('Error al cargar ofertas', err);
      }
    });
  }

  getCurrentEmployerId(): string {
    return this.authService.getCurrentUserId() || '';
  }

  navigateToCreateOffer() {
    this.router.navigate(['/create-offer'])
  }

  navigateToPostulationDetail(id: any) {
    this.router.navigate(['/detail', id])
  }

}
