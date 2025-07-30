import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { EmployerProfileSidebarComponent } from "../employer-profile-sidebar/employer-profile-sidebar.component";
import { ActivatedRoute, Router } from '@angular/router';
import { EmployerService } from '../services/employer.service';
import { DatePipe } from '@angular/common'
import { JobOffer } from '../../models/jobOffer.model';
import { AuthService } from '../services/auth.service';
import { MatIconModule } from "@angular/material/icon";

@Component({
  selector: 'app-employer-profile',
  imports: [HeaderComponent, FooterComponent, EmployerProfileSidebarComponent, DatePipe, MatIconModule],
  templateUrl: './employer-profile.component.html',
  styleUrl: './employer-profile.component.scss',
  providers: [{ provide: LOCALE_ID, useValue: 'es-AR' }],
})

export class EmployerProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private employerService: EmployerService,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  offers: JobOffer[] = [];
  currentUserId: string | null = null;
  currentUserType: string | null = null;
  itemId: string = '';
  isOwnProfile: boolean = false;

  ngOnInit(): void {
    //obtengo id de empleador desde la url
    this.itemId = this.route.snapshot.paramMap.get('id') || '';

    //obtengo id de usuario y tipo de usuario
    this.currentUserId = this.authService.getCurrentUserId();
    this.currentUserType = this.authService.getCurrentUserType();
    console.log('ID de usuario actual:', this.currentUserId);

    //flagueo estar en mi propio perfil
    if (this.currentUserId === this.itemId || (this.itemId === '' && this.currentUserType === 'empresa'))
      this.isOwnProfile = true;

    //si estoy en mi perfil, cargo mis ofertas
    if (this.isOwnProfile)
      this.loadCurrentEmployerOffers();
    else
      //sino, cargo ofertas del empleador cuyo perfil estoy viendo
      this.loadEmployerOffers(this.itemId);
  }

  private loadEmployerOffers(itemId: any) {
    this.employerService.getACtiveOffers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.offers = response.body || [];
          this.offers = this.offers.filter(offer => offer.id_empresa === itemId);
          console.log('Ofertas del empleador cargadas:', this.offers);
        }
      },
      error: (err) => {
        console.error('Error al cargar ofertas del empleador', err);
      }
    });
  }

  loadCurrentEmployerOffers(): void {
    this.employerService.getEmployerOffers().subscribe({
      next: (response) => {
        if (response.status === 200) {
          const allOffers = response.body ?? [];
          this.offers = allOffers
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
    this.router.navigate(['/detail', id], { state: { from: this.router.url } });
  }
}
