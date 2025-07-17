import { HttpClient } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../services/paginator.service';
import { TrainingLinkComponent } from '../training-link/training-link.component';
import { JobOffer } from '../../models/jobOffer.model';
import { DatePipe, registerLocaleData } from '@angular/common'
import localeEsAR from '@angular/common/locales/es-AR';
import { Postulation } from '../../models/postulation.model';
import { EmployeeService } from '../services/employee.service';

registerLocaleData(localeEsAR);

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent, DatePipe],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }, { provide: LOCALE_ID, useValue: 'es-AR' }]
})

export class LandingComponent {
  constructor(private router: Router, private http: HttpClient, private employeeService: EmployeeService) { }
  offers: JobOffer[] = [];
  postulations: Postulation[] = [];
  url: string = 'http://localhost:3000/api/empresa/ofertas/activas';
  currentPage = 0;
  pageSize = 10;



  getPostulations() {
    this.employeeService.getPostulations().subscribe({
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
  getOffers() {
    this.http.get<JobOffer[]>(this.url)
      .subscribe({
        next: (response) => {
          this.offers = response;
          console.log(this.offers)
        },
        error: (err) => {
          console.error('Error loading offers:', err);
          this.offers = [];
        }
      });
  }

  ngAfterViewInit() {

    this.getOffers();
    this.getPostulations();
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
}


