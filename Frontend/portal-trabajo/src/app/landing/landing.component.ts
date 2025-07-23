import { HttpClient } from '@angular/common/http';
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


registerLocaleData(localeEsAR);

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent, DatePipe, FilterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }, { provide: LOCALE_ID, useValue: 'es-AR' }]
})

export class LandingComponent implements OnInit {
  constructor(private router: Router, private employeeservice: EmployeeService) { }

  offers: JobOffer[] = [];
  postulations: Postulation[] = [];
  url: string = 'http://localhost:3000/api/empresa/ofertas/activas';
  currentPage = 0;
  pageSize = 10;
  showFilter = false;

  ngOnInit(): void {
    if (this.getUserType() === 'ciudadano') {
      this.getPostulations();
    }
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
}


