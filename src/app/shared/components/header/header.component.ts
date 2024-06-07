import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import AppPages from 'src/app/common/constants/AppPages';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  AppPages = AppPages;

  constructor(
    private _authService: AuthService
  ) {}

  logout() {
    this._authService.logout();
  }
}
