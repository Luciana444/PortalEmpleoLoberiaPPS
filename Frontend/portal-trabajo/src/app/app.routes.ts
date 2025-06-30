import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './employee-form/employee-form.component';
import { FormSelectorComponent } from './form-selector/form-selector.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';
import { RecoveryComponent } from './recovery/recovery.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

//right way
export const routes: Routes = [
    { path: '', component: LandingComponent},
    { path: 'form-selector', component: FormSelectorComponent },
    { path: 'employee-form', component: EmployeeFormComponent },
    { path: 'login', component: LoginComponent}, 
    { path: 'landing', component: LandingComponent},
    { path: 'recovery', component: RecoveryComponent},
    { path: 'reset', component: ResetPasswordComponent}
];

// dev playground
// export const routes: Routes = [
//     { path: '', component: LoginComponent },
    // { path: 'employee-form', component: EmployeeFormComponent },
// ];