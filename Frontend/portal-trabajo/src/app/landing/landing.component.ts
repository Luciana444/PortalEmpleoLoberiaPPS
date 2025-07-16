import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { PaginatorIntl } from '../services/paginator.service';
import { TrainingLinkComponent } from '../training-link/training-link.component';
import { JobOffer } from '../../models/jobOffer.model';

@Component({
  selector: 'app-landing',
  imports: [MatPaginator, HeaderComponent, FooterComponent, TrainingLinkComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  providers: [{ provide: MatPaginatorIntl, useClass: PaginatorIntl }]
})

export class LandingComponent {
  constructor(private router: Router, private http: HttpClient) { }
  offers: JobOffer[] = [];
  url: string = 'http://localhost:3000/api/empresa/ofertas/activas';
  currentPage = 0;
  pageSize = 10;

  getOffers() {
    this.http.get<JobOffer[]>(this.url)
      .subscribe({
        next: (response) => {
          this.offers = response;
        },
        error: (err) => {
          console.error('Error loading offers:', err);
          this.offers = [];
        }
      });
  }

  ngAfterViewInit() {
    this.getOffers();
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


