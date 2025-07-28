import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';
import { EmployerService } from '../services/employer.service';
import { AuthService } from '../services/auth.service';
import { EmployerPostulation } from '../../models/employerPostulation.model';

@Component({
  selector: 'app-postulation-list',
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './postulation-list.component.html',
  styleUrl: './postulation-list.component.scss',
  providers: [EmployerService]
})
export class PostulationListComponent implements OnInit {
  constructor(private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private employerservice: EmployerService,
  ) { }
  //TODO: ver que hacer con CV

  // private getPostulationsUrl(id: string): string {
  //   return `http://localhost:3000/api/empresa/ofertas/${id}/postulaciones`;
  // }
  private getPostulationsUrl(id: string): string {
    return `http://localhost:3000/api/empresa/ofertas/${id}/postulaciones`;
  }

  currentUserType?: string | null;
  currentUserId?: string | null;
  employees?: Employee[] = [];

  itemId?: string;

  postulations: EmployerPostulation[] = [{
    id: '1',
    id_ciudadano: '100',
    nombre: 'Juan Pérez',
    localidad: 'Lobería',
    id_oferta: '200',
    fecha_postulacion: '2025-07-28',
    mensaje: 'Estoy interesado en la oferta.',
    cv_url: '/files/cv-juan-perez.pdf',
    estado: 'pendiente',
    leido_por_empresa: false,
    perfil_url: '/profiles/juan-perez'
  },
  {
    id: '2',
    id_ciudadano: '101',
    nombre: 'Ana Gómez',
    localidad: 'Necochea',
    id_oferta: '201',
    fecha_postulacion: '2025-07-27',
    mensaje: 'Me gustaría postularme para este puesto.',
    cv_url: '/files/cv-ana-gomez.pdf',
    estado: 'aceptado',
    leido_por_empresa: true,
    perfil_url: '/profiles/ana-gomez'
  },
  {
    id: '3',
    id_ciudadano: '102',
    nombre: 'Carlos López',
    localidad: 'Mar del Plata',
    id_oferta: '202',
    fecha_postulacion: '2025-07-26',
    mensaje: 'Tengo experiencia relevante para la posición.',
    cv_url: '/files/cv-carlos-lopez.pdf',
    estado: 'rechazado',
    leido_por_empresa: true,
    perfil_url: '/profiles/carlos-lopez'
  }];
  jobOffer: JobOffer | null = null;

  ngOnInit(): void {
    //verifico que la oferta corresponda a la empresa
    this.currentUserType = this.authService.getCurrentUserType();
    this.currentUserId = this.authService.getCurrentUserId();

    //obtengo la oferta con id igual a url
    this.getCurrentOffer()

    //obtengo postulaciones a esa oferta 
    // this.getPosulations();

    //TODO delete this
    console.log(this.postulations)
  }

  navigateToProfile(id?: string) {
    if (!id || !this.employees?.some(e => e.id === id)) return;
    this.router.navigate(['employee-profile', id]);
  }

  // getCV(cvUrl: string) {
  //   console.log(cvUrl);
  // }

  //TODO: hecho con IA, sin testear
  getCV(cvUrl: string) {
    const headers = this.getAuthHeaders();
    this.http.get(cvUrl, { headers, responseType: 'blob' }).subscribe({
      next: (blob) => {
        const fileURL = URL.createObjectURL(blob);
        window.open(fileURL, '_blank');
      },
      error: (err) => {
        console.error('Error downloading CV:', err);
      }
    });
  }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getEmployees() {
    if (!this.itemId) return; // Guard clause

    const headers = this.getAuthHeaders();
    const url = this.getPostulationsUrl(this.itemId);

    this.http.get<Employee[]>(url, { headers }).subscribe({
      next: (data) => {
        this.employees = data || []; // Ensure array
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
        this.employees = []; // Fallback
      }
    });
  }

  getPosulations() {
    this.itemId = this.route.snapshot.params['id'] ?? "";
    if (this.itemId) {
      const headers = this.getAuthHeaders();
      this.http.get<EmployerPostulation[]>(this.getPostulationsUrl(this.itemId), { headers }).subscribe({
        next: (response) => {
          if (response) {
            this.postulations = response;
            console.log('Postulaciones obtenida:', this.postulations);

          } else {
            console.log('No se pudo cargar la postulación');
          }
        },
        error: (err) => {
          console.error('Error al cargar la postulación', err);
        }
      });
    }
  }

  getCurrentOffer() {
    this.employerservice.getOfferById(this.itemId).subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.jobOffer = response.body[0] as JobOffer;
          console.log("Oferta obtenida:", this.jobOffer);
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