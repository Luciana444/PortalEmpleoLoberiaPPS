import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
    standalone: true,
    selector: 'app-profile-form',
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
        FileUploaderComponent,
        HeaderComponent,
        FooterComponent,
        MatTooltipModule
    ],
    templateUrl: './profile-form.component.html',
    styleUrl: './profile-form.component.scss'
})

export class ProfileFormComponent implements OnInit {
    profile: FormGroup;
    itemId: string = "";

    constructor(private router: Router,
        private fb: FormBuilder,
        private userservice: UserService,
        private toastr: ToastrService,
        private employeeservice: EmployeeService,
        public dialog: MatDialog
    ) {
        this.profile = this.fb.group({
            nombre: ['', Validators.required],
            apellido: ['', Validators.required],
            fecha_nacimiento: ['', Validators.required],
            telefono: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            dni: ['', Validators.required],
            cuil: ['', Validators.required],
            calle: [''],
            numero: [''],
            piso: [''],
            dpto: [''],
            localidad: [''],
            provincia: [''],
            pais: ['', Validators.required],
            discapacidad: ['', Validators.required],
            cv_url: ['']
        });
    }

    ngOnInit(): void {
        this.itemId = this.getUserId(); // Get ID from route
        if (this.itemId) {
            this.employeeservice.getDataProfile().subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        let employee = response.body ?? {} as Employee;
                        this.profile.patchValue(employee); // Populate form with API data
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
        if (this.profile.invalid) return;
        this.userservice.editProfileEmployee(JSON.stringify(this.profile.value)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Ya podes ver tu perfil completo', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.profile.reset();
                    this.router.navigate(['profile']);
                } else {
                    console.log('No se pudo actualizar tu perfil', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al actualizat perfil', err);

            }
        });

    }

    onFileSelected(event: any) {
    }


    getUserId() {
        const storedTokenString = localStorage.getItem("token") ?? "";
        const decodedToken = jwtDecode<User>(storedTokenString);
        return decodedToken.id;
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
                    this.userservice.logout();
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

    navigateToProfile(){
    this.router.navigate(['profile']);
}

}




export interface User {
    id: string;
    email: string;
    tipo_usuario: string;
    iat: number;
    exp: number;
}