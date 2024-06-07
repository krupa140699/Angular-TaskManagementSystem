import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Router } from '@angular/router';
import AppPages from './common/constants/AppPages';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TaskManagementSystem';
  isAuthenticated = false;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    // Check if user authenticated or not
    this._authService.isAuthenticated$.subscribe(authenticated => {
      this.isAuthenticated = authenticated;
    })
  }
}
