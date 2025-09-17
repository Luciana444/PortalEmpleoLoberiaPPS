import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouteTranslationService } from '../services/route-translation.service';
import {MAT_CHECKBOX_DEFAULT_OPTIONS, MatCheckboxModule} from '@angular/material/checkbox';
import {MatCheckboxDefaultOptions} from '@angular/material/checkbox'
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
    selector: 'app-work-experience',
    templateUrl: './work-experience.component.html',
    styleUrls: ['./work-experience.component.scss'],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
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
    ],
    providers: [
    {provide: MAT_CHECKBOX_DEFAULT_OPTIONS, useValue: { clickAction: 'noop' } as MatCheckboxDefaultOptions},
    provideNativeDateAdapter()
        ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExperienceComponent implements OnInit {
    addNewCardExperience = false;
    editCardExperience = false;
    public workExperience: FormGroup;
    experiencias: any[] = [];
    itemId: string = "";
    workExperienceId: string = "";
    public trabajaActualmente : boolean = false;

    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private userservice: UserService,
        private employeeservice: EmployeeService,
        public dialog: MatDialog,
        private router: Router,
        private route: ActivatedRoute,
        private routeTranslation: RouteTranslationService,
    ) {

        this.workExperience = this.fb.group({
            situacion_laboral: ['', Validators.required],
            tiene_emprendimiento: [''],
            nombre_empresa: ['', Validators.required],
            desde: ['', Validators.required],
            hasta: [''],
            comentario: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    ngOnInit(): void {
        this.getDataProfile();
    }

    editWorkExperience(): void {
        if (!this.isValidSituation()) return;
        const situacionLaboral = {
            situacion_laboral: this.workExperience.value.situacion_laboral,
            tiene_emprendimiento: this.workExperience.value.tiene_emprendimiento,
        };
        this.employeeservice.addWorkExperience(JSON.stringify(situacionLaboral)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Cambios guardados', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    //this.workExperience.reset();

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

    cambiarCheckbox():void{
        this.trabajaActualmente = !this.trabajaActualmente;
    }

    addWorkExperience(): void {
        if (!this.isValidExperience()) return;
        const experiencia = {
            nombre_empresa: this.workExperience.value.nombre_empresa,
            desde: this.workExperience.value.desde,
            hasta: this.workExperience.value.hasta,
            comentario: this.workExperience.value.comentario
        };
        this.employeeservice.addWorkExperience(JSON.stringify(experiencia)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    //this.experiencias.push(experiencia);
                    this.toastr.success('Nueva experiencia laboral agregada', 'Actualización exitosa')
                    console.log('Actualización exitosa', response);
                    //this.workExperience.reset();
                    this.addNewCardExperience = false;
                    this.clearExperienceForm();
                    this.getDataProfile();
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


    editWorkExperienceById() {
        let workExperience = {
            "nombre_empresa": this.workExperience.get('nombre_empresa')?.value,
            "desde": this.workExperience.get('desde')?.value,
            "hasta": this.workExperience.get('hasta')?.value,
            "comentario": this.workExperience.get('comentario')?.value,
        };
        if (this.workExperience.invalid) return;
        this.employeeservice.editWorkExperience(this.workExperienceId, JSON.stringify(workExperience)).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Actualización exitosa', 'Experiencia editada')
                    console.log('Actualización exitosa', response);
                    this.clearEditionMode();
                    this.clearExperienceForm();
                    this.getDataProfile();
                } else {
                    console.log('No se pudo editar la experiencia', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al actualizar experiencia', err);

            }
        });
    }

    deleteWorkExperience(id: any) {
        this.employeeservice.deleteWorkExperienceById(id).subscribe({
            next: (response) => {
                if (response.status === 200) {
                    this.toastr.success('Actualización exitosa', 'Experiencia laboral borrada');
                    let indexToRemove = this.experiencias.findIndex(item => item.id === id);
                    if (indexToRemove !== -1) {
                        this.experiencias.splice(indexToRemove, 1); // Removes 1 element at the found index
                    }
                    console.log('Actualización exitosa', response);
                } else {
                    console.log('No se pudo borrar la experiencia', response);
                }
            },
            error: (err) => {
                this.toastr.error(err.error.error, 'Ocurrió un error');
                console.error('Error al borrar experiencia', err);

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
            title: 'Borrar Experiencia laboral',
            content: 'Desea borrar la experiencia laboral?',
            trueAction: 'Sí, quiero borrarla'
        }; // Pass data to the dialog

        const dialogRef = this.dialog.open(DeleteDialogComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.deleteWorkExperience(id);
                console.log('Borrar experiencia');
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

    openFormToEditExperience(id: any, nombre_empresa: string, desde: string, hasta: string, comentario: string) {
        this.addNewCardExperience = true;
        this.editCardExperience = true;
        let workExperience = {
            "nombre_empresa": nombre_empresa,
            "desde": desde,
            "hasta": hasta,
            "comentario": comentario
        }
        this.workExperience.patchValue(workExperience);
        this.workExperienceId = id;
    }

    clearEditionMode() {
        this.addNewCardExperience = false;
        this.editCardExperience = false;
        this.workExperienceId = "";
    }

    clearExperienceForm() {
        this.workExperience.get('nombre_empresa')?.reset('');
        this.workExperience.get('desde')?.reset('');
        this.workExperience.get('hasta')?.reset('');
        this.workExperience.get('comentario')?.reset('');
    }

    navigateToProfile() {
        this.routeTranslation.navigateToTranslated(['profile']);
    }

}