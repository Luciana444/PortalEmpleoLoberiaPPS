import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { Postulation } from '../../models/postulation.model';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../services/auth.service';
import { AppUtils } from '../../utils/app.utils';
import { RouteTranslationService } from '../services/route-translation.service';


@Component({
  selector: 'app-academic-background',
  imports: [MatDividerModule],
  templateUrl: './academic-background.component.html',
  styleUrl: './academic-background.component.scss'
})

export class AcademicBackgroundComponent implements OnInit {
  constructor(private router: Router,
    private employeeService: EmployeeService,
    private authService: AuthService,
    private routeTranslation: RouteTranslationService,) { }

  $id: any;
  postulations: Postulation[] = [];

  ngOnInit(): void {
    this.employeeService.getPostulations().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.postulations = response.body ?? [];
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
    this.routeTranslation.navigateToTranslated(['academic-background-edit']);
  }

  navigateToWorkExperience() {
    this.routeTranslation.navigateToTranslated(['work-experience']);
  }

  navigateToPostulationDetail(id: any) {
    this.routeTranslation.navigateToTranslated(['detail', id, true], { state: { from: this.router.url } })
  }

  convertToLocalDate(date: string) {
    return AppUtils.convertToLocalString(date);
  }

  getUserType(): string | null {
    return this.authService.getCurrentUserType();
  }

  formatIsoDateString(date: string) {
        return AppUtils.formatIsoDateString(date);
  }

}


