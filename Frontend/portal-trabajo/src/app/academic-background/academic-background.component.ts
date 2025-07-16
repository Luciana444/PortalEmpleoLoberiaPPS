import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-academic-background',
  imports: [],
  templateUrl: './academic-background.component.html',
  styleUrl: './academic-background.component.scss'
})

export class AcademicBackgroundComponent implements OnInit {
  $id: any;
  postulations: Postulation[] = [];

  constructor(private router: Router, private employeeService: EmployeeService,) { }
  ngOnInit(): void {
    this.employeeService.getPostulations().subscribe({
      next: (response) => {
        if (response.status === 200) {
          response.body?.forEach(p => {
            this.postulations.push(p);
          });
        } else {
          console.log('No se pudo cargar postulación', response);
        }
      },
      error: (err) => {
        // this.toastr.error(err.error.error, 'Ocurrió un error');
        console.error('Error al cargar postulación', err);
      }

    });

  }

  @Input() employeeData: Employee | null = null;

  navigateToAcademicBackgroundEditComponent() {
    this.router.navigate(['/academic-background-edit']);
  }

  navigateToWorkExperience() {
    this.router.navigate(['/work-experience']);
  }

   navigateToPostulationDetail(id: any) {
    this.router.navigate(['/detail', id])
  }
}

export interface Postulation {
  id: string;
  id_oferta: string;
  puesto_requerido: string;
  descripcion: string;
  fecha_postulacion: string;
}
