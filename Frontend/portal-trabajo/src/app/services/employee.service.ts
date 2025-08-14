import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Postulation } from '../../models/postulation.model';
import { WorkExperience } from '../../models/work-experience.model';
import { AcademicBackground } from '../../models/academic-background.model';
import { Profile } from '../../models/profile.model';
import { map } from 'rxjs/operators';

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

       getDataProfileForAdmin(id:string) {
        return this.httpClient.get<Employee>(`${URL}/ciudadano/${id}/datos_ciudadano`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        })
    }

    getDataProfileByPostulationId(id: string) {
        return this.httpClient.get<Employee>(`${URL}/empresa/postulaciones/${id}/perfil`, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        })
    }

    getDataProfileForEmployerByPostulationId(id: string) {
        return this.getDataProfileByPostulationId(id)
        .pipe(
            map(emp => {
                const p: Profile = {
                    nombre: emp.body?.nombre ?? "",
                    imagen_url: emp.body?.imagen_url ?? ""
                };
                return p
            }))
    }

        getDataProfileForAdminByCiudadanoId(id: string) {
        return this.getDataProfileForAdmin(id)
        .pipe(
            map(emp => {
                const p: Profile = {
                    nombre: emp.body?.nombre ?? "",
                    imagen_url: emp.body?.imagen_url ?? ""
                };
                return p
            }))
    }


    postulateToOffer(id: any, cv: any, msg: string) {
        var formdata = new FormData();
        formdata.append("cv", cv);
        formdata.append("mensaje", msg)
        return this.httpClient.post(`${URL}/ciudadano/ofertas/${id}/postular`, formdata, {
            observe: 'response',
            withCredentials: true,
            //headers: new HttpHeaders()
            //   .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
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

    editAcademicBackground(id: any, academicBackground: any) {
        return this.httpClient.put(`${URL}/ciudadano/capacitaciones/${id}`, academicBackground, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    editWorkExperience(id: any, workExperience: any) {
        return this.httpClient.patch(`${URL}/ciudadano/experiencia/${id}`, workExperience, {
            observe: 'response',
            withCredentials: true,
            headers: new HttpHeaders()
                .append('Authorization', `Bearer ${localStorage.getItem("token")}`)
                .append('Content-Type', 'application/json')
        });
    }

    deletePostulationByOfferId(id: any) {
        return this.httpClient.delete(`${URL}/ciudadano/ofertas/${id}/cancelar_postulacion`, {
            observe: 'response',
            withCredentials: true
        });
    }

    deleteAcademicBackgroundById(id: any) {
        return this.httpClient.delete(`${URL}/ciudadano/capacitaciones/${id}`, {
            observe: 'response',
            withCredentials: true
        });
    }

    deleteWorkExperienceById(id: any) {
        return this.httpClient.delete(`${URL}/ciudadano/experiencia/${id}`, {
            observe: 'response',
            withCredentials: true
        });
    }
}