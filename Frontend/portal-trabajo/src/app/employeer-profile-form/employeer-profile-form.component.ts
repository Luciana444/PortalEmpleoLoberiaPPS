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
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';


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
        CommonModule
    ],
    templateUrl: './employeer-profile-form.component.html',
    styleUrls: ['./employeer-profile-form.component.scss']
})
export class EmployeerProfileFormComponent implements OnInit {
  employeerProfile: FormGroup;

constructor(private router: Router, private fb: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
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

    }

onSubmit(): void {
    if(this.employeerProfile.valid) {
    console.log('Formulario enviado:', this.employeerProfile.value);
} else {
    console.log('Formulario inválido');
    this.employeerProfile.markAllAsTouched();
}
  }
}
