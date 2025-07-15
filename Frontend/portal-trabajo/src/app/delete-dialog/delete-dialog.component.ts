import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogContent, MatDialogClose, MatDialogActions } from '@angular/material/dialog';

@Component({
    selector: 'app-delete-dialog',
    imports: [MatDialogContent, MatDialogClose, MatDialogActions],
    templateUrl: './delete-dialog.component.html',
    styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<DeleteDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData
    ) { }

    onNoClick(): void {
        this.dialogRef.close(); // Close without a result
    }

    onConfirm(): void {
        this.dialogRef.close('Confirmed'); // Close with a result
    }
}

export interface DeleteDialogData {
    title: string,
    content: string,
    trueAction: string

}