import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { CommonAlertComponent } from './components/common-alert/common-alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonSnackbarComponent } from './components/common-snackbar/common-snackbar.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CommonAlertComponent,
    CommonSnackbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonAlertComponent,
    CommonSnackbarComponent
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_DATE_FORMATS }
  ]
})
export class SharedModule { }
