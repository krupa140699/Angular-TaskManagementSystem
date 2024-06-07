import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceStub: any;
  let routerStub: any;

  beforeEach(async () => {
    authServiceStub = {
      login: jasmine.createSpy('login').and.returnValue(of(true))
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form with email and password fields', () => {
    expect(component.loginForm.contains('email')).toBeTruthy();
    expect(component.loginForm.contains('password')).toBeTruthy();
  });

  it('should make the email and password fields required', () => {
    const emailControl = component.loginForm.get('email');
    const passwordControl = component.loginForm.get('password');

    emailControl.setValue('');
    passwordControl.setValue('');

    expect(emailControl.valid).toBeFalsy();
    expect(passwordControl.valid).toBeFalsy();

    emailControl.setValue('test@test.com');
    passwordControl.setValue('password123');

    expect(emailControl.valid).toBeTruthy();
    expect(passwordControl.valid).toBeTruthy();
  });

  it('should call the login method of AuthService when login is called and form is valid', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password123' });

    component.login();

    expect(authServiceStub.login).toHaveBeenCalledWith({
      email: 'test@test.com',
      password: 'password123'
    });
  });

  it('should navigate to the tasks page after successful login', () => {
    component.loginForm.setValue({ email: 'test@test.com', password: 'password123' });

    component.login();

    expect(routerStub.navigate).toHaveBeenCalledWith(['tasks']);
  });

  it('should not call the login method of AuthService if the form is invalid', () => {
    component.loginForm.setValue({ email: '', password: 'password123' });

    component.login();

    expect(authServiceStub.login).not.toHaveBeenCalled();
  });
});
