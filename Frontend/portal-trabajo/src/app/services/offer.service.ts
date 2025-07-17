// services/offer.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { JobOffer } from '../../models/jobOffer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
    private apiUrl = 'http://localhost:3000/api/ciudadano/filtrar/ofertas';
    // url2: string = 'http://localhost:3000/api/empresa/ofertas/activas';

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getOffers(): Observable<JobOffer[]> {
        console.log("hello world")
        let headers = new HttpHeaders();

        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');

            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`);
            }
        }

        return this.http.get<JobOffer[]>(this.apiUrl, { headers }).pipe(
            catchError(err => {
                console.error('Failed to load offers:', err);
                if (err.status === 401) this.handleUnauthorized();
                return of([]); // Return empty array on error
            })
        );
    }

    private handleUnauthorized(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            // Consider redirecting to login here
        }
    }
}