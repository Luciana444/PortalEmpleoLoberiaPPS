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
import { CvUploaderComponent } from '../cv-uploader/cv-uploader.component';


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
        CvUploaderComponent
    ],
    templateUrl: './profile-form.component.html',
    styleUrl: './profile-form.component.scss'
})

export class ProfileFormComponent implements OnInit {
    profile: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
        this.profile = this.fb.group({
            //userId: [''],
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
            nivel_educativo: ['', Validators.required],
            esta_cursando_carrera: ['', Validators.required],
            carrera_en_curso: [''],
            //cursos: [''],
            situacion_laboral: ['', Validators.required],
            tiene_emprendimiento: [''],
            discapacidad: ['', Validators.required],
            cv_url: ['']
        });
    }

    ngOnInit(): void {

    }


    editProfile() {
        if (this.profile.invalid) return;
        //this.profile.value.userId = this.getUserId();
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
}

interface User {
    id: string;
    email: string;
    tipo_usuario: string;
    iat: number;
    exp: number;
}