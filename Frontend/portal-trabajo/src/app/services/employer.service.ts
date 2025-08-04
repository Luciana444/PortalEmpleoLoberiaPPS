import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';
import { Employer } from '../../models/employer.model';
import { Notification } from '../../models/notification.model';

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

    getEmployerOffers() {
        return this.httpClient.get<JobOffer[]>(`${URL}/empresa/traer/ofertas`, {
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

    getNotifications() {
        return this.httpClient.get<Notification>(`${URL}/empresa/notificaciones`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }

      getNotificationsOffers() {
        return this.httpClient.get<Notification>(`${URL}/empresa/notificaciones/ofertas`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Content-Type', 'application/json')
        })
    }





}