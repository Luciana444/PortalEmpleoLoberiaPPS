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
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

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
        HeaderComponent, 
        FooterComponent
    ],
    templateUrl: './job-offer-form.component.html',
    styleUrl: './job-offer-form.component.scss'
})
export class JobOfferFormComponent implements OnInit {
    offersForm: FormGroup;

    constructor(private router: Router, private fb: FormBuilder, private userservice: UserService, private toastr: ToastrService) {
        this.offersForm = this.fb.group({
            puesto_requerido: ['', Validators.required],
            descipcion: ['', Validators.required],
            nivel_educativo_requerido: ['', Validators.required],
            experiencia_requerida: ['', Validators.required],
            otros_requisitos: ['', Validators.required],
            lugar_trabajo: ['', [Validators.required, Validators.email]],
            modalidad: ['', Validators.required],
            tipo_contrato: ['', Validators.required],
            localidad_puesto: [''],
           // fecha_cierre: ['']
        });
    }

    ngOnInit(): void {

    }


    submit() {
        if (this.offersForm.invalid) {
            return;
        }
    }


    createOffer() {
        if (this.offersForm.invalid) return;
        this.userservice.createNewOffer(JSON.stringify(this.offersForm.value)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Esperando aprobación', 'Oferta creada')
                    console.log('Actualización exitosa', response);
                    this.offersForm.reset();
                   // this.router.navigate(['profile']);
                } else {
                    console.log('No se pudo crear la oferta', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al crear oferta', err);

            }
        });


    }

    onFileSelected(event:any){
     }
}