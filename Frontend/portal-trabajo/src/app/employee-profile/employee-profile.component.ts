import { Component, Output, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcademicBackgroundComponent } from '../academic-background/academic-background.component';
import { AttatchCvComponent } from '../attatch-cv/attatch-cv.component';
import { Employee } from '../../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-employee-profile',
  imports: [HeaderComponent, FooterComponent, ProfileComponent, AcademicBackgroundComponent, AttatchCvComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getProfile();
  }

  url = 'http://localhost:3000/api/ciudadano/traer/perfil';

  employee: Employee = {
    id: '',
    nombre: '',
    email: '',
    dni: '',
    cuil: '',
    fecha_nacimiento: '',
    telefono: '',
    calle: '',
    numero: '',
    piso: '',
    departamento: '',
    localidad: '',
    provincia: '',
    pais: '',
    nivel_educativo: '',
    esta_cursando_carrera: false,
    carrera_en_curso: '',
    situacion_laboral: '',
    tiene_emprendimiento: '',
    discapacidad: false,
    foto: '',
    cv_url: '',
    capacitaciones: []
  };

  getProfile() {
    this.http.get<Employee>(this.url)
      .subscribe({
        next: (response) => {
          this.employee = response;
          console.log('Employee loaded:', this.employee);
        },
        error: (err) => {
          console.error('Error loading employee profile:', err);
          this.employee;
        }
      });
  }

}


