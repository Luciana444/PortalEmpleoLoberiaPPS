import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JobOffer } from '../../models/jobOffer.model';

@Component({
  selector: 'app-academic-background',
  imports: [],
  templateUrl: './academic-background.component.html',
  styleUrl: './academic-background.component.scss'
})

export class AcademicBackgroundComponent implements OnInit {
  $id: any;
  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    this.getOffers();
  }

  url: string = 'http://localhost:3000/api/ciudadano/traer/postulaciones';
  offers: JobOffer[] = [];
  @Input() employeeData: Employee | null = null;

  getOffers() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<JobOffer[]>(this.url, { headers })
      .subscribe({
        next: (response) => {
          this.offers = response;
        },
        error: (err) => {
          console.error('Error loading offers:', err);
          this.offers = [];
        }
      });
  }

  navigateToAcademicBackgroundEditComponent() {
    this.router.navigate(['/academic-background-edit']);
  }

  navigateToWorkExperience() {
    this.router.navigate(['/work-experience']);
  }

  navigateToOffer(id: any) {
    this.router.navigate(['detail', id]);
  }
}
