import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Postulation } from '../../models/postulation.model';

const URL = 'http://localhost:3000/api';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    constructor(private httpClient: HttpClient) { }

    getDataProfile() {
        return this.httpClient.get<Employee>(`${URL}/ciudadano/traer/perfil`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        })
    }


    postulateToOffer(id: any, cv: any, msg:string) {
        var formdata = new FormData();
        formdata.append("cv", cv);
        formdata.append("mensaje", msg)
        return this.httpClient.post(`${URL}/ciudadano/ofertas/${id}/postular`, formdata, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        });
    }

    getPostulations() {
        return this.httpClient.get<Postulation[]>(`${URL}/ciudadano/traer/postulaciones`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        })
    }

     deletePostulationById(id: any) {
            return this.httpClient.delete(`${URL}/ciudadano/ofertas/${id}/cancelar_postulacion`, {
                observe: 'response',
                withCredentials: true,
                headers: new HttpHeaders()
                    .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                    .append('Content-Type', 'application/json')
            });
        }
}