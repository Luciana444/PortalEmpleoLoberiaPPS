import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { JobOffer } from '../../models/jobOffer.model';
import { Employer } from '../../models/employer.model';

const URL = 'http://localhost:3000/api';

@Injectable({
    providedIn: 'root'
})
export class EmployerService {
    constructor(private httpClient: HttpClient) { }

    getOfferById(id: any) {
        return this.httpClient.get<any>(`${URL}/usuario/ofertas/${id}`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    getACtiveOffers() {
        return this.httpClient.get<JobOffer[]>(`${URL}/empresa/ofertas/activas`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    deleteOfferById(id: any) {
        return this.httpClient.delete(`${URL}/empresa/eliminar/oferta/${id}`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    editOffer(id: any, offer: any) {
        return this.httpClient.patch(`${URL}/empresa/ofertas/${id}`, offer, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    getDataProfile() {
        return this.httpClient.get<Employer>(`${URL}/empresa/datos`, {
                observe: 'response',
                withCredentials: true,
                headers: new HttpHeaders()
                  .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                  .append('Content-Type', 'application/json')
              })
        }
}