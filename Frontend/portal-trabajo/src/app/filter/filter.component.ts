import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { JobOffer } from '../../models/jobOffer.model';
import { OfferService } from '../services/offer.service';
import { FormControlName, FormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-filter',
  imports: [FormsModule, MatInputModule, MatSelectModule, MatIconModule, MatCardModule],
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
    this.loadOffers();
  }

  loadOffers() {
    this.offerService.getOffers().subscribe({
      next: (offers) => {
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
        console.log("offers ", offers)
      },
      error: (err) => {
        console.error('Error filtering offers:', err);
        this.offersLoaded.emit([]);
      }
    });
  }
}