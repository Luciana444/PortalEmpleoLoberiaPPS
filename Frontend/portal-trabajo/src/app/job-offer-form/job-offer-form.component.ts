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
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { EmployerService } from '../services/employer.service';
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
    itemId: string = "";

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private userservice: UserService,
        private employerservice: EmployerService,
        private toastr: ToastrService,
        private route: ActivatedRoute
    ) {
        this.offersForm = this.fb.group({
            puesto_requerido: ['', Validators.required],
            descripcion: ['', Validators.required],
            nivel_educativo_requerido: ['', Validators.required],
            experiencia_requerida: ['', Validators.required],
            otros_requisitos: ['', Validators.required],
            lugar_trabajo: ['', Validators.required],
            modalidad: ['', Validators.required],
            tipo_contrato: ['', Validators.required],
            localidad_del_puesto: [''],
            // fecha_cierre: ['']
        });
    }

    ngOnInit(): void {
        this.itemId = this.route.snapshot.paramMap.get('id') ?? ""; // Get ID from route
        if (this.itemId) {
            this.employerservice.getOfferById(this.itemId).subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        this.offersForm.patchValue(response); // Populate form with API data
                    } else {
                        console.log('No se pudo cargar oferta', response);
                    }
                },
                error: (err) => {
                    this.toastr.error(err.error.error, 'Ocurrió un error');
                    console.error('Error al cargar oferta', err);
                }

            });
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
                    this.router.navigate(['employer-profile']);
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


    /*editOffer() {
        if (this.offersForm.invalid) return;
        this.employerservice.editOffer(JSON.stringify(this.offersForm.value)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('ACtualización exitosa', 'Oferta editada')
                    console.log('Actualización exitosa', response);
                    this.offersForm.reset();
                    //this.router.navigate(['postulation-detail']);
                } else {
                    console.log('No se pudo crear la oferta', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al actualizar oferta', err);

            }
        });


    }*/

    onFileSelected(event: any) {
    }
}
