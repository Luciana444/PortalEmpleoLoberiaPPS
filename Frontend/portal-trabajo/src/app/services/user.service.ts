import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/profile.model';
import { environment } from '../../environments/environment';



const URL =`${environment.apiUrl}/api`;

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

  uploadProfilePicture(foto: File, tipo_usuario: string) {
    var formdata = new FormData();
    formdata.append("foto", foto)
    return this.httpClient.post(`${URL}/usuario/foto/perfil`, formdata, {
      observe: 'response',
      withCredentials: true,
      headers: new HttpHeaders().append('Authorization', `Bearer ${localStorage.getItem("token")}`)
    });
  }

  getDataProfile(tipo_usuario: any) {
    if (tipo_usuario === 'ciudadano') {
      return this.httpClient.get<any>(`${URL}/ciudadano/traer/perfil`, {
        observe: 'response',
        withCredentials: true,
        headers: new HttpHeaders()
          .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
          .append('Content-Type', 'application/json')
      }).pipe(
        map(res => {
          const p: Profile = {
            nombre: res.body?.nombre + " " + (res.body?.apellido ?? ''),
            imagen_url: res.body?.imagen_url
          };
          return p
        })
      );
    } else if (tipo_usuario === 'empresa') {
      return this.httpClient.get<any>(`${URL}/empresa/datos`, {
        observe: 'response',
        withCredentials: true,
        headers: new HttpHeaders()
          .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
          .append('Content-Type', 'application/json')
      }).pipe(
        map(res => {
          const p: Profile = {
            nombre: res.body?.nombre_empresa,
            imagen_url: res.body?.logo
          };
          return p
        })
      );
    }
    return null; //Falta definir Admin profile
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentuser');

  }

  deleteAccountById() {
    return this.httpClient.delete(`${URL}/usuario/eliminar_cuenta`, {
      observe: 'response',
      withCredentials: true                    
    });
  }
 
  saveVisits() {
    return this.httpClient.post(`${URL}/auth/visitas`, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    })
  }
}