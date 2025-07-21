import { Component, OnInit } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { Employee } from '../../models/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';
import { EmployerService } from '../services/employer.service';
import { AuthService } from '../services/auth.service';

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

  private getPostulationsUrl(id: string): string {
    return `http://localhost:3000/api/empresa/ofertas/${id}/postulaciones`;
  }
  // private urlCV = 'http://localhost:3000/api/empresa/postulaciones/{id}/cv'

  currentUserType?: string | null;
  currentUserId?: string | null;
  employees?: Employee[] = [];
  itemId?: string;
  jobOffer: JobOffer | null = null;

  ngOnInit(): void {
    //verifico que la oferta corresponda a la empresa
    this.currentUserType = this.authService.getCurrentUserType();
    this.currentUserId = this.authService.getCurrentUserId();

    //obtengo la oferta con id igual a url
    this.getCurrentOffer()

    //obtengo los empleados postulados a esa oferta 
    this.getEmployees()
  }

  navigateToProfile(id?: string) {
    if (!id || !this.employees?.some(e => e.id === id)) return;
    this.router.navigate(['employee-profile', id]);
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

  getCurrentOffer() {
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

}