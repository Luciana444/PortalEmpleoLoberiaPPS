import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormSelectorComponent } from './form-selector/form-selector.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { JobOfferFormComponent } from './job-offer-form/job-offer-form.component';


export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'form-selector', component: FormSelectorComponent },
    { path: 'employee-form', component: EmployeeFormComponent },
    { path: 'login', component: LoginComponent}, 
    { path: 'landing', component: LandingComponent},
    { path: 'recovery', component: RecoveryComponent},
    { path: 'reset', component: ResetPasswordComponent},
    { path: 'edit-profile', component: ProfileFormComponent},
    { path: 'create-offer', component: JobOfferFormComponent}
];