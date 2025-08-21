import { Component, Output, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcademicBackgroundComponent } from '../academic-background/academic-background.component';
import { AttatchCvComponent } from '../attatch-cv/attatch-cv.component';
import { Employee } from '../../models/employee.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { User } from '../profile-form/profile-form.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { RouteTranslationService } from '../services/route-translation.service';

@Component({
  selector: 'app-employee-profile',
  imports: [HeaderComponent, FooterComponent, ProfileComponent, AcademicBackgroundComponent, AttatchCvComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent implements OnInit {
  constructor(
    private routeTranslation: RouteTranslationService,
    private route: ActivatedRoute,
    private employeeservice: EmployeeService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  employee: Employee = {} as Employee;
  itemId: string = "";
  previousRoute: string = ' ';

  ngOnInit() {
    const userType = this.getUserType();

    this.previousRoute = history.state?.from || ' ';

    if (userType === 'empresa') {
      this.itemId = this.route.snapshot.params['id'] ?? "";
      this.employeeservice.getDataProfileByPostulationId(this.itemId)?.subscribe({
        next: (response) => {
          this.employee = response.body ?? {} as Employee;
        },
        error: (err) => {
          console.error('Profile load error', err);
        }
      });
    } else if (userType === 'admin') {
      this.itemId = this.route.snapshot.params['id'] ?? "";
      this.employeeservice.getDataProfileForAdmin(this.itemId)?.subscribe({
        next: (response) => {
          if (response) {
            this.employee = response.body ?? {} as Employee;;
          } else {
            console.log('Profile load failed', response);
          }
        },
        error: (err) => {
          console.error('Profile load error', err);
        }
      });
    } else {
      this.getProfile();
    }
    console.log("previous url", this.previousRoute);

  }

  getProfile() {
    this.employeeservice.getDataProfile()
      .subscribe({
        next: (response) => {
          this.employee = response.body ?? {} as Employee;
          console.log('Employee loaded:', this.employee);
        },
        error: (err) => {
          console.error('Error loading employee profile:', err);
          this.employee;
        }
      });
  }

  getUserType(): string | null {
    if (!isPlatformBrowser(this.platformId))
      return null;

    try {
      const storedTokenString = localStorage.getItem("token");
      if (!storedTokenString)
        return null;

      const decodedToken = jwtDecode<User>(storedTokenString);
      return decodedToken.tipo_usuario || null;
    } catch (e) {
      console.error('Token decode error:', e);
      return null;
    }
  }

  navigateBack() {
    if (this.previousRoute.includes('profile'))
      this.routeTranslation.navigateToTranslated(['profile']);
    else if (this.previousRoute.includes('admin-panel'))
      this.routeTranslation.navigateToTranslated(['admin-panel']);
    else if (this.previousRoute.includes('postulaciones-por-oferta'))
      this.routeTranslation.navigateToTranslated([this.previousRoute]);
    else
      // Default to home or previous route
      this.routeTranslation.navigateToTranslated(['']);
  }

}