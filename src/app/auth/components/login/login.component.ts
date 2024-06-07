import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import AppPages from 'src/app/common/constants/AppPages';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonSnackbarComponent } from 'src/app/shared/components/common-snackbar/common-snackbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  durationInSeconds = 5;
  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _snackBar: MatSnackBar
  ) { }

  login() {
    if (this.loginForm.valid) {
      let body = {
        email: this.loginForm?.value.email ?? '',
        password: this.loginForm?.value.password ?? ''
      };
      this._authService.login(body).subscribe({
        next: (res) => {
          if (res) {
            this._router.navigate([`${AppPages.Tasks}`]);
          }
        },
        error: (err) => {
          this.opneSnackbar(err);
        }
      })
    }
  }

  opneSnackbar(errMsg: any) {
    this._snackBar.openFromComponent(CommonSnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      data: errMsg,
      panelClass: 'error-snackbar'
    });
  }
}
