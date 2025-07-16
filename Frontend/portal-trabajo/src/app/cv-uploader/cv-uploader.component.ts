import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-cv-uploader',
    templateUrl: './cv-uploader.component.html',
    styleUrls: ['./cv-uploader.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule
    ],
})

export class CvUploaderComponent {
    @Output() cvUploaded = new EventEmitter<File>();
    constructor(private userservice: UserService, private toastr: ToastrService) {
    }

    maxSize = 2 * 1024 * 1024; // 2 MB

    @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;

    fileTooBig: boolean = false;

    onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files?.[0];
        if (file) {

            if (file.size > this.maxSize) {
                this.fileTooBig = true;
                this.toastr.error('El archivo tiene mas de 2mb', 'Archivo no subido');

            } else {
                this.fileTooBig = false;
                this.notifyCvUploaded(file);
                /*this.userservice.uploadCv(file).subscribe({
                    next: (response) => {
                        if (response.status === 200) {

                            this.toastr.success('Tu Cv ya está disponible', 'Archivo subido')
                            console.log('Archivo subido con éxito', response);

                        } else {
                            console.log('No se pudo subir el archivo', response);
                        }
                    },
                    error: (err) => {

                        this.toastr.error(err.error.error, 'Ocurrió un error');
                        console.error('Error al intentar subir un archivo', err);

                    }
                });*/


            }
        }

    }

    isBigFile() { console.log(this.fileTooBig); return this.fileTooBig; }

    notifyCvUploaded(file: any) {
        //console.log('CV uploaded');
        this.cvUploaded.emit(file);
    }
}