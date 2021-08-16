import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './planet.dialog.html'
})
export class DialogPlanet {
  constructor(
    public dialogRef: MatDialogRef<DialogPlanet>,
    @Inject(MAT_DIALOG_DATA) public data: { array: any[], name: string }
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
