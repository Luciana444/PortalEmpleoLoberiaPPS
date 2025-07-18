import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormGroupDirective } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ControlContainer } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { EmployeeService } from '../services/employee.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../profile-form/profile-form.component';
import { Employee } from '../../models/employee.model';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrls: ['./work-experience.component.scss'],
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
        MatIconModule,
        HeaderComponent,
        FooterComponent,
        MatDividerModule
    ]

})
export class WorkExperienceComponent implements OnInit {
    addNewCardExperience = false;
    public workExperience: FormGroup;
    experiencias: any[] = [];
    itemId: string = "";
    constructor(private fb: FormBuilder, 
        private toastr: ToastrService, 
        private userservice: UserService,
        private employeeservice: EmployeeService
    ) {

        this.workExperience = this.fb.group({
            situacion_laboral: ['', Validators.required],
            tiene_emprendimiento: [''],
            nombre_empresa: ['', Validators.required],
            desde: ['', Validators.required],
            hasta: ['', Validators.required],
            comentario: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit(): void {
        this.itemId = this.getUserId(); // Get ID from route
        if (this.itemId) {
            this.employeeservice.getDataProfile().subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        let employee = response.body ?? {} as Employee;
                        this.workExperience.patchValue(employee); // Populate form with API data
                        this.experiencias = employee.experiencias_laborales;
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

    editWorkExperience(): void {
        if (!this.isValidSituation()) return;
        const situacionLaboral = {
            situacion_laboral: this.workExperience.value.situacion_laboral,
            tiene_emprendimiento: this.workExperience.value.tiene_emprendimiento,
        };
        this.userservice.addWorkExperience(JSON.stringify(situacionLaboral)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Cambios guardados', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.workExperience.reset();

                } else {
                    console.log('No se pudo guardar los cambios', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al guardar cambios', err);

            }
        });
    }

    addWorkExperience(): void {
        if (!this.isValidExperience()) return;
        const experiencia = {
            nombre_empresa: this.workExperience.value.nombre_empresa,
            desde: this.workExperience.value.desde,
            hasta: this.workExperience.value.hasta,
            comentario: this.workExperience.value.comentario
        };
        this.userservice.addWorkExperience(JSON.stringify(experiencia)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.experiencias.push(experiencia);
                    this.toastr.success('Nueva experiencia laboral agregada', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.workExperience.reset();
                    this.addNewCardExperience = false;
                } else {
                    console.log('No se pudo agregar experiencia', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al agregar experiencia', err);

            }
        });
    }



    isValidExperience() {
        return this.workExperience.get('nombre_empresa')?.valid &&
            this.workExperience.get('desde')?.valid &&
            this.workExperience.get('hasta')?.valid &&
            this.workExperience.get('comentario')?.valid
    }

    isValidSituation() {
        return this.workExperience.get('situacion_laboral')?.valid
    }

    getUserId() {
        const storedTokenString = localStorage.getItem("token") ?? "";
        const decodedToken = jwtDecode<User>(storedTokenString);
        return decodedToken.id;
    }

}