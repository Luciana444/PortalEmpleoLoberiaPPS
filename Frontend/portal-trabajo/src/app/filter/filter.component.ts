import { Component, EventEmitter, Output, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { JobOffer } from '../../models/jobOffer.model';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Output() offersLoaded = new EventEmitter<JobOffer[]>();

  constructor(
    private offerService: OfferService,
  ) { }

  offers: JobOffer[] = [];
  // urlFilter: string = 'http://localhost:3000/api/ciudadano/filtrar/ofertas';

  ngOnInit() {
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getOffers().subscribe(offers => {
      this.offersLoaded.emit(offers);
    });
  }
}