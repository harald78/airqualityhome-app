import {ComponentFixture, fakeAsync, TestBed} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MockProvider} from "ng-mocks";
import {AuthService} from "../../../core/auth/service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule
      ],
      providers: [
        MockProvider(AuthService)
      ]
    })
    .compileComponents().then(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        authService = TestBed.inject(AuthService);
        fixture.detectChanges();
      });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call login if form is not valid', fakeAsync(() => {
    const authServiceSpy = jest.spyOn(authService, 'login');
    component.login();

    expect(authServiceSpy).not.toHaveBeenCalled();
  }));

  it('should call login if form is valid', fakeAsync(() => {
    const authServiceSpy = jest.spyOn(authService, 'login');
    component.loginForm.get('username')?.setValue('test');
    component.loginForm.get('password')?.setValue('anyPassword');

    component.login();

    expect(authServiceSpy).toHaveBeenCalled();
  }));
});
