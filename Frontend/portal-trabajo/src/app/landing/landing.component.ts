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
import { FilterComponent } from "../filter/filter.component";

registerLocaleData(localeEsAR);

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent, DatePipe, FilterComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }, { provide: LOCALE_ID, useValue: 'es-AR' }]
})

export class LandingComponent {
  constructor(private router: Router, private http: HttpClient) { }
  offers: JobOffer[] = [];
  currentPage = 0;
  pageSize = 10;

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
    this.router.navigate(['detail', id]);
  }

}


