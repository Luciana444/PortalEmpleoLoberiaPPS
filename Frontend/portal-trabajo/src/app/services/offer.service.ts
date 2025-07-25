import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, catchError, of } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { JobOffer } from '../../models/jobOffer.model';

@Injectable({ providedIn: 'root' })
export class OfferService {
    private url = 'http://localhost:3000/api/ciudadano/filtrar/ofertas';

    constructor(
        private http: HttpClient,
    ) { }

    getOffers(filter?: { lugar_trabajo?: string, modalidad?: string, descripcion?: string, puestoRequerido?: string }): Observable<JobOffer[]> {

        return this.getAuthenticatedOffers(filter?.lugar_trabajo,
            filter?.modalidad, filter?.descripcion, filter?.puestoRequerido);
    }

    private getAuthenticatedOffers(
        lugarTrabajo?: string,
        modalidad?: string,
        descripcion?: string,
        puestoRequerido?: string): Observable<JobOffer[]> {
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

        return this.http.get<JobOffer[]>(this.url, {
            params
        }).pipe(
            catchError(err => {
                console.error('Failed to load ciudadano offers:', err);
                return of([]);
            })
        );
    }

}