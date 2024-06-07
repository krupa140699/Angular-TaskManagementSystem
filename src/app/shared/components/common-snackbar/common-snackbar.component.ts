import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-common-snackbar',
  templateUrl: './common-snackbar.component.html',
  styleUrls: ['./common-snackbar.component.scss']
})
export class CommonSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

}
