import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';

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
    constructor(private userservice: UserService) {
    }

    maxSize = 2 * 1024 * 1024; // 2 MB

    @ViewChild('hiddenInput') hiddenInput!: ElementRef<HTMLInputElement>;

    fileTooBig: boolean = false;

    onFileSelected(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        const file = inputElement.files?.[0];
        if (file) {
            const fileInput = document.getElementById('fileCvInput') as HTMLInputElement;
            if (fileInput) {
                if (fileInput.size > this.maxSize) {
                    this.fileTooBig = true;
                    fileInput.value = "";

                } else {
                    fileInput.value = file.name;
                    this.fileTooBig = false;
                    // Handle the selected file (e.g., upload it)
                    this.userservice.uploadCv(file).subscribe({
                        next: (response) => {
                            if (response.status === 200) {

                                console.log('Archivo subido con éxito', response);

                            } else {
                                console.log('No se pudo subir el archivo', response);
                            }
                        },
                        error: (err) => {

                            console.error('Error al intentar subir un archivo', err);

                        }
                    });


                }
            }

        }
    }

    isBigFile() { console.log(this.fileTooBig); return this.fileTooBig; }

}