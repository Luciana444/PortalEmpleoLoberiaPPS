import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProfileComponent } from '../profile/profile.component';
import { AcademicBackgroundComponent } from '../academic-background/academic-background.component';
import { AttatchCvComponent } from '../attatch-cv/attatch-cv.component';

@Component({
  selector: 'app-employee-profile',
  imports: [HeaderComponent, FooterComponent, ProfileComponent, AcademicBackgroundComponent, AttatchCvComponent],
  templateUrl: './employee-profile.component.html',
  styleUrl: './employee-profile.component.scss'
})
export class EmployeeProfileComponent {

}
