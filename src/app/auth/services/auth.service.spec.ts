import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { DataService } from 'src/app/core/data.service';
import { Router } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { LoginModel } from '../models/LoginModel';
import { ApiMap } from 'src/app/common/api.map';
import AppPages from 'src/app/common/constants/AppPages';

describe('AuthService', () => {
  let service: AuthService;
  let dataServiceStub: any;
  let routerStub: any;

  beforeEach(() => {
    dataServiceStub = {
      get: jasmine.createSpy('get').and.returnValue(of([{ id: 1, name: 'John Doe', email: 'test@test.com' }]))
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: DataService, useValue: dataServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    });

    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with the correct authentication status', () => {
    expect(service.isAuthenticatedSubject.value).toBeFalse();
  });

  it('should return null if no user is stored in localStorage', () => {
    expect(service.getUser()).toBeNull();
  });

  it('should return the user object if a user is stored in localStorage', () => {
    const user: UserModel = { id: 1, name: 'John Doe', email: 'test@test.com' };
    localStorage.setItem('user', JSON.stringify(user));
    expect(service.getUser()).toEqual(user);
  });

  it('should update the user and authentication status in localStorage', () => {
    const user: UserModel = { id: 1, name: 'John Doe', email: 'test@test.com' };
    service.setUser(user);
    expect(localStorage.getItem('user')).toEqual(JSON.stringify(user));
    expect(service.isAuthenticatedSubject.value).toBeTrue();
  });

  it('should make a login request and update the user on success', () => {
    const loginData: LoginModel = { email: 'test@test.com', password: 'password123' };
    service.login(loginData).subscribe(() => {
      expect(dataServiceStub.get).toHaveBeenCalledWith(`${ApiMap.userLogin.url}?email=test@test.com&password=password123`);
      expect(service.getUser()).toEqual({ id: 1, name: 'John Doe', email: 'test@test.com' });
      expect(service.isAuthenticatedSubject.value).toBeTrue();
    });
  });

  it('should clear the user data and navigate to login page on logout', () => {
    const user: UserModel = { id: 1, name: 'John Doe', email: 'test@test.com' };
    localStorage.setItem('user', JSON.stringify(user));
    service.logout();
    expect(localStorage.getItem('user')).toBeNull();
    expect(service.isAuthenticatedSubject.value).toBeFalse();
    expect(routerStub.navigate).toHaveBeenCalledWith([`${AppPages.Login}`]);
  });

  it('should return false if user is not authenticated', () => {
    localStorage.removeItem('user');
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should return true if user is authenticated', () => {
    const user: UserModel = { id: 1, name: 'John Doe', email: 'test@test.com' };
    localStorage.setItem('user', JSON.stringify(user));
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should call logout if user is not found during isAuthenticated check', () => {
    spyOn(service, 'logout').and.callThrough();
    localStorage.removeItem('user');
    service.isAuthenticated();
    expect(service.logout).toHaveBeenCalled();
  });
});
