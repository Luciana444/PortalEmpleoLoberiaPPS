import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';


const URL =`${environment.apiUrl}/api`;

@Injectable({
    providedIn: 'root'
})
export class ReportsService {
    constructor(private httpClient: HttpClient) { }

    getTotalOffers() {
        return this.httpClient.get<any>(`${URL}/admin/ofertas_totales`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

    getTotalUsers() {
        return this.httpClient.get<any>(`${URL}/admin/usuarios/resumen`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

    getTotalPostulations() {
        return this.httpClient.get<any>(`${URL}/admin/postulaciones_totales`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

        getTotalVisits() {
        return this.httpClient.get<any>(`${URL}/admin/ver/visitas`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

    downloadReportSite(){
         return this.httpClient.get(`${URL}/admin/generar_reporte`,
              {
                responseType: 'blob',
                observe: 'response',
                withCredentials: true,
                headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`)
              });
        
    }
}