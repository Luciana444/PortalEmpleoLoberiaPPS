import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { JobOffer } from '../../models/jobOffer.model';
import { OfferService } from '../services/offer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() offersLoaded = new EventEmitter<JobOffer[]>();
  workLocations: string[] = [];
  lugar_trabajo?: string;

  constructor(private offerService: OfferService) { }

  ngOnInit() {
    this.loadInitialOffers();
  }

  loadInitialOffers() {
    this.offerService.getPublicOffers().subscribe({
      next: (offers) => {
        // Extract distinct locations immediately
        this.workLocations = this.getDistinctWorkLocations(offers);
        console.log('Initial work locations:', this.workLocations);

        // Optionally emit the offers if needed
        this.offersLoaded.emit(offers);
      },
      error: (err) => {
        console.error('Error loading initial offers:', err);
        this.offersLoaded.emit([]);
      }
    });
  }

  setFilter(locationSelect: string) {
    this.lugar_trabajo = locationSelect;
    this.filterOffers();
  }

  filterOffers() {
    this.offerService.getOffers({ lugar_trabajo: this.lugar_trabajo }).subscribe({
      next: (offers) => {
        this.offersLoaded.emit(offers);
      },
      error: (err) => {
        console.error('Error filtering offers:', err);
        this.offersLoaded.emit([]);
      }
    });
  }

  private getDistinctWorkLocations(offers: JobOffer[]): string[] {
    return [...new Set(
      offers
        .map(offer => offer.lugar_trabajo)
        .filter(location => !!location)
    )];
  }
}