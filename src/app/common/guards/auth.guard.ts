import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import AppPages from '../constants/AppPages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public _authService: AuthService,
    public router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    // Check if user authenticated or not
    if (!this._authService.isAuthenticated()) {
      return of(this.router.createUrlTree([`${AppPages.Login}`]));
    } else {
      return of(true);
    }
  }
}
