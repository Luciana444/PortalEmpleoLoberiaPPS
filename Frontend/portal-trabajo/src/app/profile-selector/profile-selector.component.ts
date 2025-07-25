import { Component, OnInit } from '@angular/core';
import { EmployeeProfileComponent } from "../employee-profile/employee-profile.component";
import { EmployerProfileComponent } from "../employer-profile/employer-profile.component";
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile-selector',
  imports: [EmployeeProfileComponent, EmployerProfileComponent,],
  templateUrl: './profile-selector.component.html',
  styleUrl: './profile-selector.component.scss'
})
export class ProfileSelectorComponent implements OnInit {
  userType: string | null = null;

  ngOnInit() {
    this.loadUserType();
  }

  loadUserType() {
    this.userType = this.getUserType();
  }

  getUserType(): string | null {
    const token = localStorage.getItem("token");
    if (!token)
      return null;
    const decoded = jwtDecode(token) as { tipo_usuario?: string };
    return decoded.tipo_usuario || null;
  }
}