import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';
import { EmployerService } from '../services/employer.service';

@Component({
  selector: 'app-postulation-list',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './postulation-list.component.html',
  styleUrl: './postulation-list.component.scss',
  providers: [EmployerService]
})
export class PostulationListComponent implements OnInit {
  constructor(private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private employerservice: EmployerService,
  ) { }

  private url = 'http://localhost:3000/api/empresa/ofertas/{id}/postulaciones';
  // private urlCV = 'http://localhost:3000/api/empresa/postulaciones/{id}/cv'

  currentUserId: any;
  currentUserType: any;
  employees: Employee[] = [];
  itemId: string = "";
  jobOffer: JobOffer = {
    id: '',
    id_empresa: '',
    nombre_empresa: '',
    localidad: '',
    puesto_requerido: '',
    descripcion: '',
    lugar_trabajo: '',
    modalidad: '',
    tipo_contrato: '',
    fecha_publicacion: '',
    fecha_cierre: '',
    experiencia_requerida: '',
    otros_requisitos: '',
    nivel_educativo_requerido: ''
  };

  ngOnInit(): void {

    this.getJobOffer() //obtengo la oferta con id igual a url
    this.getEmployees() //obtengo los empleados postulados a esa oferta
  }

  navigateToProfile(id: string) {
    if (this.employees.find(e => e.id === id)) {
      this.router.navigate(['employee-profile', id]);
    }
  }

  getCV(cvUrl: string) {
    console.log(cvUrl);
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEmployees() {
    const headers = this.getAuthHeaders();

    this.http.get<Employee[]>(this.url, { headers }).subscribe({
      next: (data) => {
        this.employees = data;
      }
    })
  }

  getJobOffer() {
    this.itemId = this.route.snapshot.params['id'] ?? "";
    if (this.itemId) {
      this.employerservice.getOfferById(this.itemId).subscribe({
        next: (response) => {
          if (response.status === 200) {
            this.jobOffer = response.body[0] as JobOffer;
          } else {
            console.log('No se pudo cargar oferta', response);
          }
        },
        error: (err) => {
          console.error('Error al cargar oferta', err);
        }

      });
    }

  }

  private checkCurrentUserType() {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = this.parseJwt(token);

      if (userData && userData.tipo_usuario) {
        this.currentUserType = userData.tipo_usuario;
        this.currentUserId = userData.id;
      } else {
        console.warn('Token does not contain tipo_usuario');
      }
    }
  }

  parseJwt(token: string | null): any {
    if (!token) return null;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      console.error("Error parsing JWT:", e);
      return null;
    }
  }
}
