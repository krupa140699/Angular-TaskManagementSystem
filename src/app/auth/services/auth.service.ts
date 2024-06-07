import { Injectable } from '@angular/core';
import { LoginModel } from '../models/LoginModel';
import { UserModel } from '../models/UserModel';
import { DataService } from 'src/app/core/data.service';
import { ApiMap } from 'src/app/common/api.map';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import AppPages from 'src/app/common/constants/AppPages';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // isAuthenticated behaviour subject
  private isAuthenticatedSubject: BehaviorSubject<boolean>;
  isAuthenticated$: Observable<boolean>;

  constructor(
    private _dataService: DataService,
    private _router: Router
  ) {
    const isAuthenticated = !!this.getUser();
    this.isAuthenticatedSubject = new BehaviorSubject<boolean>(isAuthenticated);
    this.isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  }

  // Check if user authenticated or not
  isAuthenticated(): boolean {
    let user = this.getUser();
    if (!user) {
      this.logout();
    }
    return !!user;
  }

  // Get user data
  getUser() {
    let user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user);
    }
    return null;
  }

  // Set user data
  setUser(user: UserModel) {
    let userData = JSON.stringify(user);
    localStorage.setItem('user', userData);
    this.isAuthenticatedSubject.next(true);
  }

  // User login
  login(loginData: LoginModel) {
    return this._dataService.get<UserModel[]>(`${ApiMap.userLogin.url}?email=${loginData.email}&password=${loginData.password}`).pipe(
      tap((user: UserModel[]) => {
        if (user) {
          this.setUser(user[0]);
        }
      })
    );
  }

  // User logout
  logout() {
    localStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this._router.navigate([`${AppPages.Login}`]);
  }
}
