import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ChangePasswordComponent } from './change-password.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AccountService } from '../../service/account.service';
import { ToastService } from '../../../../shared/components/toast/toast.service';
import { mdiCheck } from '@mdi/js';
import { userMock } from '../../../../../../mock/user-mock';
import { AuthState } from '../../../../core/auth/+state/auth.state';
import { Router, RouterModule } from '@angular/router';
import { routes } from '../../../../app.routes';
import { NgZone } from '@angular/core';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';

describe('ChangePasswordComponent Test', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;
  let accountService: AccountService;
  let toastService: ToastService;
  let authState: AuthState;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ChangePasswordComponent,
        HttpClientTestingModule,
        RouterModule.forRoot(routes)
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    accountService = TestBed.inject(AccountService);
    toastService = TestBed.inject(ToastService);
    authState = TestBed.inject(AuthState);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error on different passwords', fakeAsync(() => {
    const debugElement = fixture.debugElement;
    const passwordInput = debugElement.query(By.css('#password-input')).nativeElement as HTMLInputElement;
    const passwordRepeatInput = debugElement.query(By.css('#password-repeat-input')).nativeElement as HTMLInputElement;
    const saveButton = debugElement.query(By.css('#savePassword-button')).nativeElement as HTMLButtonElement;

    passwordInput.value = "1234";
    passwordInput.dispatchEvent(new Event('input'));
    passwordRepeatInput.value = "123";
    passwordRepeatInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(100);

    const passwordError = debugElement.query(By.css('#password-error')).nativeElement;

    expect(passwordError).toBeTruthy();
    expect(passwordError.innerHTML).toContain("Passwords do not match!");
    expect(saveButton.disabled).toBeTruthy();
  }));

  it('should show no error when passwords match', fakeAsync(() => {
    const debugElement = fixture.debugElement;
    const passwordInput = debugElement.query(By.css('#password-input')).nativeElement as HTMLInputElement;
    const passwordRepeatInput = debugElement.query(By.css('#password-repeat-input')).nativeElement as HTMLInputElement;
    const saveButton = debugElement.query(By.css('#savePassword-button')).nativeElement as HTMLButtonElement;

    passwordInput.value = "1234";
    passwordInput.dispatchEvent(new Event('input'));
    passwordRepeatInput.value = "1234";
    passwordRepeatInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    tick(100);

    const passwordError = debugElement.query(By.css('#password-error'));

    expect(passwordError).toBeNull();
    expect(saveButton.disabled).toBeFalsy();
  }));

  it('should handle saveData method correctly', async () => {
    const accountServiceSpy = jest.spyOn(accountService, 'savePassword')
      .mockResolvedValue(userMock);
    const toastSpy = jest.spyOn(toastService, 'show');
    const expectedToast = {classname: "bg-success text-light", header: '',
      body: "Password changed successfully", icon: mdiCheck, iconColor: "white"};
    component.passwordForm.get('password')?.setValue('123');
    authState.setUser(userMock);
    const expectedChangeRequest = {
      id: userMock.id,
      username: userMock.username,
      password: '123'
    };
    fixture.detectChanges();

    await component.saveData();

    expect(accountServiceSpy).toHaveBeenCalledWith(expectedChangeRequest);
    expect(toastSpy).toHaveBeenCalledWith(expectedToast);
  });

  it('should navigate back', async () => {
    const routerSpy = jest.spyOn(router, 'navigate');

    await ngZone.run(async () => await component.navigateBack());

    expect(routerSpy).toHaveBeenCalledWith(['account']);
  });
});
