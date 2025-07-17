import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogClose, MatDialogActions } from '@angular/material/dialog';
import { CvUploaderComponent } from '../cv-uploader/cv-uploader.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-Postulate-dialog',
    imports: [
        MatDialogContent,
        MatDialogClose,
        MatDialogActions,
        CvUploaderComponent,
        MatFormFieldModule,
        MatInputModule,
        FormsModule],
    templateUrl: './postulate-dialog.component.html',
    styleUrls: ['./postulate-dialog.component.scss']
})
export class PostulateDialogComponent {
    file: any | null;
    message: string;

    constructor(
        public dialogRef: MatDialogRef<PostulateDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.message = ""
    }

    onNoClick(): void {
        this.dialogRef.close(); // Close without a result
    }

    onConfirm(): void {
        this.data.action(this.file, this.message);
        this.dialogRef.close('Confirmed'); // Close with a result
    }

    receiveCv(file: File) {
        this.file = file;
    }

}

export interface PostulateDialogData {
    title: string,
    content: string,
    trueAction: string,
    action: any
}
