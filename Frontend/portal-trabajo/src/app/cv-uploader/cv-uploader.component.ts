import { Component, ElementRef, Output, ViewChild, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
    selector: 'app-cv-uploader',
    templateUrl: './cv-uploader.component.html',
    styleUrls: ['./cv-uploader.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule, 
        MatTooltipModule
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
            }
        }

    }

    isBigFile() { console.log(this.fileTooBig); return this.fileTooBig; }

    notifyCvUploaded(file: any) {
        //console.log('CV uploaded');
        this.cvUploaded.emit(file);
    }
}