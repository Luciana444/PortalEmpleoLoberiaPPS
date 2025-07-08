import { Component, Output, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcademicBackgroundComponent } from '../academic-background/academic-background.component';
import { AttatchCvComponent } from '../attatch-cv/attatch-cv.component';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-profile',
  imports: [HeaderComponent, FooterComponent, ProfileComponent, AcademicBackgroundComponent, AttatchCvComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {

  ngOnInit() {
    this.loadData();
  }

  employee: Employee | null = null;

  mockEmployee: Employee = {
    id: 12345678,
    name: 'Juan',
    surname: 'Pérez',
    location: 'Buenos Aires',
    country: 'Argentina',
    province: 'Buenos Aires',
    birthdate: '1985-05-15',
    cuil: 20123456789,
    hasDisability: false,
    phoneNumber: '+5491145678901',
    email: 'juan.perez@example.com',
    address: 'Av. Corrientes 1234',
  };

  loadData() {

    this.employee = { ...this.mockEmployee };
    console.log(this.employee.id);
    console.log(this.mockEmployee.cuil);
  }
}


