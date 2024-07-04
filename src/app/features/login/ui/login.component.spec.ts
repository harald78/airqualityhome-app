import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {MockProvider} from "ng-mocks";
import {AuthService} from "../../../core/auth/service/auth.service";
import {ReactiveFormsModule} from "@angular/forms";
import { By } from '@angular/platform-browser';

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

  it('should not hide password when clicking on eye', fakeAsync(() => {
    // given
    const passwordInput = fixture.debugElement.query(By.css('#aq-password-input')).nativeElement as HTMLInputElement;
    const eyeIcon = fixture.debugElement.query(By.css('.eye-icon')).nativeElement;

    // when
    passwordInput.value = "1234";
    passwordInput.dispatchEvent(new Event('input'));
    eyeIcon.click();

    fixture.detectChanges();
    tick(100);

    // then
    expect(passwordInput.value).toEqual('1234');
  }));
});
