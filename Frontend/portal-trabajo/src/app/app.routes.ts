import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { JobOfferFormComponent } from './job-offer-form/job-offer-form.component';
import { EmployeeProfileComponent } from './employee-profile/employee-profile.component';
import { PostulationDetailComponent } from './postulation-detail/postulation-detail.component';
import { EmployeerProfileFormComponent } from './employeer-profile-form/employeer-profile-form.component';
import { WorkExperienceComponent } from './work-experience/work-experience.component';
import { AcademicBackgroundEditComponent } from './academic-background-edit/academic-background-edit.component';
import { EmployerProfileComponent } from './employer-profile/employer-profile.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'employee-form', component: EmployeeFormComponent },
    { path: 'login', component: LoginComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'recovery', component: RecoveryComponent },
    { path: 'reset', component: ResetPasswordComponent },
    { path: 'edit-profile', component: ProfileFormComponent },
    { path: 'create-offer', component: JobOfferFormComponent },
    { path: 'create-offer/:id', component: JobOfferFormComponent },
    { path: 'employee-profile', component: EmployeeProfileComponent },
    { path: 'detail', component: PostulationDetailComponent },
    { path: 'detail/:id', component: PostulationDetailComponent },
    { path: 'edit-profile-employer', component: EmployeerProfileFormComponent },
    { path: 'employer-profile', component: EmployerProfileComponent },
    { path: 'work-experience', component: WorkExperienceComponent },
    { path: 'academic-background-edit', component: AcademicBackgroundEditComponent },

];