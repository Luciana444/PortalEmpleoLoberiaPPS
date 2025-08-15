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
import { environment } from '../../environments/environment';

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

  private getPostulationsUrl(id: string): string {
    return `${environment.apiUrl}/api/empresa/ofertas/${id}/postulaciones`;
  }

  private getCVUrl(id: string): string {
    return `${environment.apiUrl}0/api/empresa/postulaciones/${id}/cv`;
  }

  currentUserType?: string | null;
  currentUserId?: string | null;
  employees?: Employee[] = [];

  itemId?: string;

  postulations: EmployerPostulation[] = [];
  jobOffer: JobOffer | null = null;

  ngOnInit(): void {
    //verifico que la oferta corresponda a la empresa
    this.currentUserType = this.authService.getCurrentUserType();
    this.currentUserId = this.authService.getCurrentUserId();

    //asigno itemId (url de la pagina)
    this.itemId = this.route.snapshot.params['id'] ?? "";

    //obtengo la oferta con id igual a url
    this.getCurrentOffer(this.itemId);

    //obtengo postulaciones a esa oferta 
    this.getPosulations(this.itemId);
  }

  navigateToProfile(id?: string) {
    this.router.navigate(['employee-profile', id], { state: { from: this.router.url } });
  }

  getCV(postulationId: string) {
    console.log(postulationId);
    this.http.get(this.getCVUrl(postulationId), { responseType: 'blob' }).subscribe({
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

  getPosulations(itemId: any) {
    if (itemId) {
      const headers = this.getAuthHeaders();
      this.http.get<EmployerPostulation[]>(this.getPostulationsUrl(itemId), { headers }).subscribe({
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

  getCurrentOffer(itemId: any) {
    this.employerservice.getOfferById(itemId).subscribe({
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

  navigateToOffer(id: any) {
    this.router.navigate(['detail', id], { state: { from: this.router.url } });
  }

  getImageUrl(image_url: string) {
    return image_url ? `${environment.apiUrl}${image_url}` : null;
  }
}