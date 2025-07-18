import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JobOffer } from '../../models/jobOffer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
    private ciudadanoUrl = 'http://localhost:3000/api/ciudadano/filtrar/ofertas';
    private empresaUrl = 'http://localhost:3000/api/empresa/ofertas/activas';

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object
    ) { }

    getOffers(filter?: { lugar_trabajo?: string, modalidad?: string, descripcion?: string, puestoRequerido?: string }): Observable<JobOffer[]> {
        if (this.shouldUseCiudadanoEndpoint())
            return this.getAuthenticatedOffers(filter?.lugar_trabajo,
                filter?.modalidad, filter?.descripcion, filter?.puestoRequerido);

        return this.getPublicOffers();
    }

    private getAuthenticatedOffers(
        lugarTrabajo?: string,
        modalidad?: string,
        descripcion?: string,
        puestoRequerido?: string): Observable<JobOffer[]> {
        const headers = this.getAuthHeaders();
        const params: any = {};

        if (lugarTrabajo)
            params.lugar_trabajo = lugarTrabajo;

        if (modalidad)
            params.modalidad = modalidad;

        if (descripcion)
            params.descripcion = descripcion;
        console.log(puestoRequerido)
        if (puestoRequerido)
            params.puesto_requerido = puestoRequerido;

        console.log("params: ", params);

        return this.http.get<JobOffer[]>(this.ciudadanoUrl, {
            headers,
            params
        }).pipe(
            catchError(err => {
                console.error('Failed to load ciudadano offers:', err);
                if (err.status === 401) this.handleUnauthorized();
                return this.getPublicOffers();
            })
        );
    }

    getPublicOffers(): Observable<JobOffer[]> {
        return this.http.get<JobOffer[]>(this.empresaUrl).pipe(
            catchError(err => {
                console.error('Failed to load public offers:', err);
                return of([]);
            })
        );
    }

    private shouldUseCiudadanoEndpoint(): boolean {
        if (!isPlatformBrowser(this.platformId)) return false;

        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const decoded: any = jwtDecode(token);
            const isExpired = Date.now() >= decoded.exp * 1000;
            const isCiudadano = decoded.tipo_usuario === 'ciudadano';
            return !isExpired && isCiudadano;
        } catch (e) {
            console.error('Token decode error:', e);
            return false;
        }
    }

    private getAuthHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
        if (isPlatformBrowser(this.platformId)) {
            const token = localStorage.getItem('token');
            if (token) {
                headers = headers.set('Authorization', `Bearer ${token}`,);
            }
        }
        return headers;
    }

    private handleUnauthorized(): void {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('token');
            // Consider redirecting to login here
        }
    }
}