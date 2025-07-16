import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogClose, MatDialogActions } from '@angular/material/dialog';
import { CvUploaderComponent } from '../cv-uploader/cv-uploader.component';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-Postulate-dialog',
    imports: [MatDialogContent, MatDialogClose, MatDialogActions, CvUploaderComponent],
    templateUrl: './postulate-dialog.component.html',
    styleUrls: ['./postulate-dialog.component.scss']
})
export class PostulateDialogComponent {
    @Output() cvReceived = new EventEmitter<File>();
    file: any | null;
    constructor(
        private userservice: UserService,
        private toastr: ToastrService,
        public dialogRef: MatDialogRef<PostulateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

    onNoClick(): void {
        this.dialogRef.close(); // Close without a result
    }

    onConfirm(): void {   
        this.data.action(this.file);     
        this.dialogRef.close('Confirmed'); // Close with a result
    }

    receiveCv(file: File) {
        this.file = file;
        this.cvReceived.emit(file);
    }

}

export interface PostulateDialogData {
    title: string,
    content: string,
    trueAction: string,
    action: any
}
