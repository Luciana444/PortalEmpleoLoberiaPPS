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
import { PostulationListComponent } from './postulation-list/postulation-list.component';
import { ProfileSelectorComponent } from './profile-selector/profile-selector.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'inicio', component: LandingComponent },

    { path: 'register-user', component: EmployeeFormComponent },
    { path: 'registrar-usuario', component: EmployeeFormComponent },

    { path: 'login', component: LoginComponent },
    { path: 'iniciar-sesion', component: LoginComponent },

    { path: 'landing', component: LandingComponent },
    { path: 'inicio', component: LandingComponent },

    { path: 'recovery', component: RecoveryComponent },
    { path: 'recuperar-contrasena', component: RecoveryComponent },

    { path: 'reset', component: ResetPasswordComponent },
    { path: 'restablecer-contrasena', component: ResetPasswordComponent },

    { path: 'edit-profile', component: ProfileFormComponent },
    { path: 'editar-perfil', component: ProfileFormComponent },

    { path: 'create-offer', component: JobOfferFormComponent },
    { path: 'create-offer/:id', component: JobOfferFormComponent },
    { path: 'crear-oferta', component: JobOfferFormComponent },
    { path: 'crear-oferta/:id', component: JobOfferFormComponent },

    { path: 'employee-profile', component: EmployeeProfileComponent },
    { path: 'employee-profile/:id', component: EmployeeProfileComponent },
    { path: 'perfil-empleado', component: EmployeeProfileComponent },
    { path: 'perfil-empleado/:id', component: EmployeeProfileComponent },

    { path: 'detail/:id', component: PostulationDetailComponent },
    { path: 'detail/:id/:postulado', component: PostulationDetailComponent },
    { path: 'detalle/:id', component: PostulationDetailComponent },
    { path: 'detalle/:id/:postulado', component: PostulationDetailComponent },

    { path: 'edit-profile-employer', component: EmployeerProfileFormComponent },
    { path: 'editar-perfil-empleador', component: EmployeerProfileFormComponent },

    { path: 'employer-profile', component: EmployerProfileComponent },
    { path: 'employer-profile/:id', component: EmployerProfileComponent },
    { path: 'perfil-empleador', component: EmployerProfileComponent },
    { path: 'perfil-empleador/:id', component: EmployerProfileComponent },

    { path: 'work-experience', component: WorkExperienceComponent },
    { path: 'experiencia-laboral', component: WorkExperienceComponent },

    { path: 'academic-background-edit', component: AcademicBackgroundEditComponent },
    { path: 'editar-formacion-academica', component: AcademicBackgroundEditComponent },

    { path: 'postulations-by-offer', component: PostulationListComponent },
    { path: 'postulaciones-por-oferta', component: PostulationListComponent },
    { path: 'postulations-by-offer/:id', component: PostulationListComponent },
    { path: 'postulaciones-por-oferta/:id', component: PostulationListComponent },

    { path: 'profile', component: ProfileSelectorComponent },
    { path: 'perfil', component: ProfileSelectorComponent },

    { path: 'admin-panel', component: AdminPanelComponent },
    { path: 'panel-administrador', component: AdminPanelComponent },

    { path: '**', redirectTo: 'inicio' }
];
