import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';

const URL = 'http://localhost:3000/api';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    constructor(private httpClient: HttpClient) { }

        getOffersLikeAdmin() {
        return this.httpClient.get<JobOffer[]>(`${URL}/admin/ofertas/laborales`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }
}