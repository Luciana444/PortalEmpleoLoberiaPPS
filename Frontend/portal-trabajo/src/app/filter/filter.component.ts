import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { JobOffer } from '../../models/jobOffer.model';
import { OfferService } from '../services/offer.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter',
  imports: [FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  constructor(private offerService: OfferService) { }

  @Output() offersLoaded = new EventEmitter<JobOffer[]>();
  workLocations: string[] = [];
  workModalities: string[] = [];

  modalidad?: string;
  lugar_trabajo?: string;
  descripcion?: string = '';
  puesto_requerido?: string = '';

  ngOnInit() {
    this.loadInitialOffers();
  }

  loadInitialOffers() {
    this.offerService.getPublicOffers().subscribe({
      next: (offers) => {
        // Extract distinct locations immediately
        this.workLocations = this.getDistinctWorkLocations(offers);
        this.workModalities = this.getDistinctModalities(offers);

        // Optionally emit the offers if needed
        this.offersLoaded.emit(offers);
      },
      error: (err) => {
        console.error('Error loading initial offers:', err);
        this.offersLoaded.emit([]);
      }
    });
  }

  setFilter(locationSelect: string, modalitySelect: string, descripcion: string, puestoRequerido: string) {
    this.lugar_trabajo = locationSelect;
    this.modalidad = modalitySelect;
    this.descripcion = descripcion;
    this.puesto_requerido = puestoRequerido;
    console.log(puestoRequerido)
    this.filterOffers();
  }

  filterOffers() {
    this.offerService.getOffers({
      lugar_trabajo: this.lugar_trabajo,
      modalidad: this.modalidad,
      descripcion: this.descripcion,
      puestoRequerido: this.puesto_requerido
    }).subscribe({
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

  private getDistinctModalities(offers: JobOffer[]): string[] {
    return [...new Set(
      offers
        .map(offer => offer.modalidad)
        .filter(modality => !!modality)
    )];
  }
}