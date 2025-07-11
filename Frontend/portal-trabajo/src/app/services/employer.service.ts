 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



const URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {
    constructor(private httpClient: HttpClient) { }

 getOfferById(id:any) {
    return this.httpClient.get<any>(`${URL}/usuario/ofertas/${id}`, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    }); 
 } 
 
 deleteOffer(newOffer: any) {
    return this.httpClient.post(`${URL}/empresa/ofertas`, newOffer, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });
  }

  editOffer(newOffer: any) {
    return this.httpClient.post(`${URL}/empresa/ofertas`, newOffer, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });
  }
  }