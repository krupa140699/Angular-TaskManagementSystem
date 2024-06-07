import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-common-alert',
  templateUrl: './common-alert.component.html',
  styleUrls: ['./common-alert.component.scss']
})
export class CommonAlertComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommonAlertComponent>,
  ) { }
}
