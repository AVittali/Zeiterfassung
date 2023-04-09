import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'ort-dialog',
    templateUrl: 'ort-dialog.html'
})
export class OrtDialog {

    value : string = "asda";
    ortFormControl = new FormControl('');

    constructor(
        public dialogRef: MatDialogRef<OrtDialog>,
        @Inject(MAT_DIALOG_DATA) public data: string,
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}