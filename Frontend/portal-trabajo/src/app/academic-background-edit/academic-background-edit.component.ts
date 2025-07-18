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
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { AcademicBackground } from '../../models/academic-background.model';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../profile-form/profile-form.component';

@Component({
    selector: 'app-academic-background-edit',
    templateUrl: './academic-background-edit.component.html',
    styleUrls: ['./academic-background-edit.component.scss'],
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
        FooterComponent
    ]

})
export class AcademicBackgroundEditComponent implements OnInit {
    addNewCardEducation = false;
    public educationForm: FormGroup;
    formaciones: any[] = [];
    itemId: string = "";

    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private userservice: UserService,
        private employeeservice: EmployeeService,

    ) {

        this.educationForm = this.fb.group({
            nivel_educativo: ['', Validators.required],
            esta_cursando_carrera: ['', Validators.required],
            carrera_en_curso: [''],
            nombre_capacitacion: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.itemId = this.getUserId(); // Get ID from route
        if (this.itemId) {
            this.employeeservice.getDataProfile().subscribe({
                next: (response) => {
                    if (response.status === 200) {
                        let employee = response.body ?? {} as Employee;
                        this.educationForm.patchValue(employee); // Populate form with API data
                        this.formaciones = employee.capacitaciones;
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

    editEducationForm(): void {
        if (!this.isValidAcademicBackground()) return;
        const academicBackground = {
            nivel_educativo: this.educationForm.value.nivel_educativo,
            esta_cursando_carrera: this.educationForm.value.esta_cursando_carrera,
            carrera_en_curso: this.educationForm.value.carrera_en_curso,
        };
        this.userservice.addeducationForm(JSON.stringify(academicBackground)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Cambios guardados', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.educationForm.reset();

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

    addEducationForm(): void {
        if (!this.isValidCapacitacion()) return;
        const education = {
            nombre_capacitacion: this.educationForm.value.nombre_capacitacion,

        };
        this.userservice.addeducationForm(JSON.stringify(education)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.formaciones.push(education);
                    this.toastr.success('Nueva capacitación agregada', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.educationForm.reset();
                    this.addNewCardEducation = false;
                } else {
                    console.log('No se pudo agregar capacitación', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al agregar experiencia', err);

            }
        });
    }



    isValidAcademicBackground() {
        return this.educationForm.get('nivel_educativo')?.valid &&
            this.educationForm.get('esta_cursando_carrera')?.valid &&
            this.educationForm.get('carrera_en_curso')?.valid
    }

    isValidCapacitacion() {
        return this.educationForm.get('nombre_capacitacion')?.valid
    }

      getUserId() {
                const storedTokenString = localStorage.getItem("token") ?? "";
                const decodedToken = jwtDecode<User>(storedTokenString);
                return decodedToken.id;
            }
}