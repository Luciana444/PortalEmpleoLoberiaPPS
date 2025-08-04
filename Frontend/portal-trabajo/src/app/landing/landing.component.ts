import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../services/paginator.service';
import { TrainingLinkComponent } from '../training-link/training-link.component';
import { JobOffer } from '../../models/jobOffer.model';
import { DatePipe, registerLocaleData } from '@angular/common'
import localeEsAR from '@angular/common/locales/es-AR';
import { FilterComponent } from "../filter/filter.component";
import { Postulation } from '../../models/postulation.model';
import { EmployeeService } from '../services/employee.service';
import { User } from '../profile-form/profile-form.component';
import { jwtDecode } from 'jwt-decode';
import { MatIconModule } from "@angular/material/icon";
import { UserService } from '../services/user.service';


registerLocaleData(localeEsAR);

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent, DatePipe, FilterComponent, MatIconModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }, { provide: LOCALE_ID, useValue: 'es-AR' }]
})

export class LandingComponent implements OnInit {
  constructor(
    private router: Router,
    private employeeservice: EmployeeService,
    private userservice: UserService,
    private http: HttpClient,
  ) { }

  offers: JobOffer[] = [];
  postulations: Postulation[] = [];
  url: string = 'http://localhost:3000/api/empresa/ofertas/activas';
  currentPage = 0;
  pageSize = 10;
  showFilter = false;

  ngOnInit(): void {
    if (this.getUserType() === 'ciudadano')
      this.getPostulations();

    this.registerVisit();
  }

  handleOffersLoaded(offers: JobOffer[]) {
    this.offers = offers;
    console.log(this.offers);
  }

  handlePageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  get pagedOffers() {
    const start = this.currentPage * this.pageSize;
    return this.offers.slice(start, start + this.pageSize);
  }

  navigateToOffer(id: any) {
    if (this.postulations.find(p => p.id_oferta === id)) {
      this.router.navigate(['detail', id, true]);
    } else {
      this.router.navigate(['detail', id]);
    }
  }

  getPostulations() {
    this.employeeservice.getPostulations().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.postulations = response.body ?? [];
        } else {
          console.log('No se pudo cargar postulación', response);
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al cargar postulación', err);
      }
    });
  }

  getUserType() {
    try {
      if (typeof localStorage !== 'undefined') {
        const storedTokenString = localStorage.getItem("token") ?? "";
        if (storedTokenString) {
          const decodedToken = jwtDecode<User>(storedTokenString);
          return decodedToken.tipo_usuario;
        }
      }
      return null;
    } catch (err) {
      console.error('Error decoding token:', err);
      return null;
    }
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
  }

  getImageUrl(image_url: string) {
    return image_url ? `http://localhost:3000${image_url}` : null;
  }

  navigateToEmpoyerProfile(id: string) {
    this.router.navigate(['/employer-profile', id]);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    if (!token)
      return new HttpHeaders();

    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  registerVisit(): void {
    const pageName = this.router.url;

    if (!this.isAuthenticated()) {
      console.warn('Usuario no autenticado, no se registrará la visita');
      return;
    }

    const headers = this.getAuthHeaders();
    if (!headers.has('Authorization'))
      return;

    this.http.post(
      'http://localhost:3000/api/auth/visitas',
      { pagina: pageName },
      { headers }
    ).subscribe({
      next: (response: any) => {
        console.log('Visita registrada con exito:', response);
      },
      error: (error) => {
        console.error('[VisitCounter] Failed to register visit:', error);
        if (error.status === 401)
          console.warn('[VisitCounter] Unauthorized - token might be invalid or expired');
      },
      complete: () => {
        console.log('[VisitCounter] Visit registration complete');
      }
    });
  }

  private isAuthenticated(): boolean {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('[VisitCounter] No token found in localStorage');
        return false;
      }

      // Basic token validation
      const decoded = jwtDecode(token);
      if (!decoded || !decoded.exp) {
        console.warn('[VisitCounter] Invalid token format');
        return false;
      }

      // Check if token is expired
      const isExpired = Date.now() >= decoded.exp * 1000;
      if (isExpired) {
        console.warn('[VisitCounter] Token has expired');
        return false;
      }

      return true;
    } catch (error) {
      console.error('[VisitCounter] Error checking authentication:', error);
      return false;
    }
  }

}