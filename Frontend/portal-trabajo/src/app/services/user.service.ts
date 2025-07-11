import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';



const URL = 'http://localhost:3000/api';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private httpClient: HttpClient) { }

  login(body: any) {
    return this.httpClient.post(`${URL}/auth/login`, body, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }

  recoveryPassword(emailData: { email: string }) {
    return this.httpClient.post(`${URL}/auth/recover/password`, emailData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  registerNewUser(userData: any) {
    return this.httpClient.post(`${URL}/auth/register`, userData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
  resetPassword(credentials: any) {
    return this.httpClient.post(`${URL}/auth/reset/password`, credentials, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  editProfileEmployee(profileData: any) {
    return this.httpClient.patch(`${URL}/ciudadano/actualizar/perfil`, profileData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });

  }

  editProfileEmployeer(profileEmployeerData: any) {
    return this.httpClient.patch(`${URL}/empresa/actualizar/perfil`, profileEmployeerData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });

  }


  createNewOffer(newOffer: any) {
    return this.httpClient.post(`${URL}/empresa/ofertas`, newOffer, {
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

  uploadProfilePicture(foto: File, tipo_usuario: string) {
    var formdata = new FormData();
    formdata.append("foto", foto)
    return this.httpClient.post(`${URL}/usuario/foto/perfil`, formdata, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`)
    });
  }

  uploadCv(cv: File) {
    var formdata = new FormData();
    formdata.append("cv", cv)
    return this.httpClient.put(`${URL}/ciudadano/upload_cv`, formdata, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`)
    });
  }

  downloadGeneratedCv(url: string) {
    return this.httpClient.get(`${URL}/ciudadano/generar_cv`,
      {
        responseType: 'blob',
        observe: 'response',
        withCredentials: true,
        headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`)
      });

  }
  addWorkExperience(workExperienceData: any) {
    return this.httpClient.patch(`${URL}/ciudadano/actualizar/perfil`, workExperienceData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });
  }

  addeducationForm(educationData: any) {
    return this.httpClient.patch(`${URL}/ciudadano/actualizar/perfil`, educationData, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders()
        .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
        .append('Content-Type', 'application/json')
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');

  }
}