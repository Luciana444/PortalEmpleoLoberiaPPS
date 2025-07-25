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
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';

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
        FooterComponent,
        MatDividerModule,
        MatTooltipModule
    ]

})
export class AcademicBackgroundEditComponent implements OnInit {
    addNewCardEducation = false;
    editCardEducation = false;
    public educationForm: FormGroup;
    formaciones: any[] = [];
    itemId: string = "";
    capacitacionId: string = "";

    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private userservice: UserService,
        private employeeservice: EmployeeService,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,

    ) {

        this.educationForm = this.fb.group({
            nivel_educativo: ['', Validators.required],
            esta_cursando_carrera: ['', Validators.required],
            carrera_en_curso: [''],
            nombre_capacitacion: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.getDataProfile();
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
                    this.toastr.success('Nueva capacitación agregada', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    this.educationForm.reset();
                    this.addNewCardEducation = false;
                    this.getDataProfile();
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

    editAcademicBackground() {
        let education = {
            "nombre_capacitacion": this.educationForm.get('nombre_capacitacion')?.value
        };
        if (this.educationForm.invalid) return;
        this.employeeservice.editAcademicBackground(this.capacitacionId, JSON.stringify(education)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Actualización exitosa', 'Formación editada')
                    console.log('Actualización exitosa', response);
                    this.educationForm.reset();
                    this.clearEditionMode();
                    this.getDataProfile();
                } else {
                    console.log('No se pudo editar la formación', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al actualizar formación', err);

            }
        });
    }

    deleteAcademicBackground(id: any) {
        this.employeeservice.deleteAcademicBackgroundById(id).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Actualización exitosa', 'Formación borrada')
                    let indexToRemove = this.formaciones.findIndex(item => item.id === id);
                    if (indexToRemove !== -1) {
                        this.formaciones.splice(indexToRemove, 1); // Removes 1 element at the found index
                    }

                    console.log('Actualización exitosa', response);
                } else {
                    console.log('No se pudo borrar la oferta', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al borrar oferta', err);

            }
        });

    }

    openDialog(id: any): void {
        const dialogConfig = new MatDialogConfig();

        // Configure dialog options (optional)
        dialogConfig.disableClose = true; // Prevent closing by clicking outside
        dialogConfig.autoFocus = true; // Automatically focus the first tabbable element
        dialogConfig.width = '400px'; // Set dialog width
        dialogConfig.data = {
            title: 'Borrar formación',
            content: 'Desea borrar la formación?',
            trueAction: 'Sí, quiero borrarla'
        }; // Pass data to the dialog

        const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteAcademicBackground(id);
                console.log('Borrar formacion');
            }

            console.log('Dialog was closed with result:', result);
        });
    }


    getDataProfile() {
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

    openFormToEditEducation(id: any, nombre_capacitacion: string) {
        this.addNewCardEducation = true;
        this.editCardEducation = true;

        this.educationForm.patchValue({ "nombre_capacitacion": nombre_capacitacion });
        this.capacitacionId = id;
    }

    clearEditionMode() {
        this.addNewCardEducation = false;
        this.editCardEducation = false;
        this.capacitacionId = "";
    }
}