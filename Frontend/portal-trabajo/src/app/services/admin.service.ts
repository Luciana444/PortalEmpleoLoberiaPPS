import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';
import { Employee } from '../../models/employee.model';

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

    getEmployeesLikeAdmin() {
        return this.httpClient.get<Employee[]>(`${URL}/admin/ciudadanos`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

    changeOfferStatusByAdmin(id :any, estado:string) {
        let estado_aprobacion = {
            estado_publicacion: estado
        }
        return this.httpClient.put(`${URL}/admin/ofertas/${id}/autorizar`, estado_aprobacion, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }
}