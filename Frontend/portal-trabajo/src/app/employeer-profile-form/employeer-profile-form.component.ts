import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Employer } from '../../models/employer.model';
import { User } from '../profile-form/profile-form.component';
import { jwtDecode } from 'jwt-decode';
import { EmployerService } from '../services/employer.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';


@Component({
    selector: 'app-employeer-profile-form',
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatButtonModule,
        CommonModule,
        HeaderComponent,
        FooterComponent,
        MatTooltipModule,
        FileUploaderComponent       
    ],
    templateUrl: './employeer-profile-form.component.html',
    styleUrls: ['./employeer-profile-form.component.scss']
})
export class EmployeerProfileFormComponent implements OnInit {
    employeerProfile: FormGroup;
    itemId: string = "";

    constructor(private router: Router,
        private fb: FormBuilder,
        private userservice: UserService,
        private toastr: ToastrService,
        private employerservice: EmployerService,
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) {
        this.employeerProfile = this.fb.group({
            nombre_empresa: ['', Validators.required],
            email_contacto: ['', [Validators.required, Validators.email]],
            logo: [''],
            sitio_web: [''],
            cuit: ['', Validators.required],
            rubro: [''],
            telefono: [''],
            calle: ['', Validators.required],
            numero: ['', Validators.required],
            piso: [''],
            dpto: [''],
            localidad: ['', Validators.required],
            provincia: ['', Validators.required],
            pais: ['', Validators.required]
        });
    }
    ngOnInit(): void {
        this.itemId = this.getUserId(); // Get ID from route
        if (this.itemId) {
            this.employerservice.getDataProfile().subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        let employer = response.body ?? {} as Employer;
                        this.employeerProfile.patchValue(employer); // Populate form with API data
                    } else {
                        console.log('No se pudo cargar datos', response);
                    }
                },
                error: (err) => {
                    this.toastr.error(err.error.error, 'Ocurrió un error');
                    console.error('Error al cargar datos', err);
                }

            });
        }

    }

    editProfile() {
        if (this.employeerProfile.invalid) return;
        this.userservice.editProfileEmployeer(JSON.stringify(this.employeerProfile.value)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Ya podes ver tu perfil completo', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.employeerProfile.reset();
                    this.router.navigate(['employer-profile']);
                } else {
                    console.log('No se pudo actualizar tu perfil', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al actualizar perfil', err);

            }
        });

    }

    openDialogDeleteAccount(): void {
        const dialogConfig = new MatDialogConfig();

        // Configure dialog options (optional)
        dialogConfig.disableClose = true; // Prevent closing by clicking outside
        dialogConfig.autoFocus = true; // Automatically focus the first tabbable element
        dialogConfig.width = '400px'; // Set dialog width
        dialogConfig.data = {
            title: 'Eliminar Cuenta',
            content: 'Desea eliminar la cuenta? Esta acción es irreversible ',
            trueAction: 'Sí, quiero eliminarla'
        }; // Pass data to the dialog

        const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteAccount();
                console.log('Borrada postulación');
            }

            console.log('Dialog was closed with result:', result);
        });
    }


    deleteAccount() {
        this.userservice.deleteAccountById().subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Actualización exitosa', 'Cuenta borrada')
                    console.log('Cuenta borrada', response);

                    this.router.navigate(['login']);
                } else {
                    console.log('No se pudo borrar la cuenta', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al borrar la cuenta', err);

            }
        });
    }



      getUserId() {
            const storedTokenString = localStorage.getItem("token") ?? "";
            const decodedToken = jwtDecode<User>(storedTokenString);
            return decodedToken.id;
        }

}