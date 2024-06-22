import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChangeAccountComponent } from './change-account.component';
import { IconComponent } from '../../../../shared/components/icon/icon/icon.component';
import { AuthState } from '../../../../core/auth/+state/auth.state';
import { Router, RouterModule } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { changedUserMock, userMock } from '../../../../../../mock/user-mock';
import { NgZone } from '@angular/core';
import { routesMock } from '../../../../../../mock/routes.mock';
import {AuthService} from "../../../../core/auth/service/auth.service";

describe('ChangeAccountComponent Test', () => {
  let component: ChangeAccountComponent;
  let fixture: ComponentFixture<ChangeAccountComponent>;
  let authState: AuthState;
  let authService: AuthService;
  let accountService: AccountService;
  let router: Router;
  let ngZone: NgZone;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ChangeAccountComponent,
        IconComponent,
        HttpClientTestingModule,
        RouterModule.forRoot(routesMock)],
      providers: []
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeAccountComponent);
    authState = TestBed.inject(AuthState);
    authService = TestBed.inject(AuthService);
    accountService = TestBed.inject(AccountService);
    router = TestBed.inject(Router);
    ngZone = TestBed.inject(NgZone);

    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable input forms onInit', () => {
    const debugElement = fixture.debugElement;
    const usernameInput = debugElement.query(By.css('#change-username-input')).nativeElement as HTMLInputElement;
    const emailInput = debugElement.query(By.css('#change-email-input')).nativeElement as HTMLInputElement;

    expect(usernameInput.disabled).toBeTruthy();
    expect(emailInput.disabled).toBeTruthy();
  });

  it('should click on "Change" button and enable input forms', fakeAsync(() => {
    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    const usernameInput = debugElement.query(By.css('#change-username-input')).nativeElement as HTMLInputElement;
    const emailInput = debugElement.query(By.css('#change-email-input')).nativeElement as HTMLInputElement;

    changeButton.click();
    fixture.detectChanges();

    tick(100)

    const saveButton = debugElement.query(By.css('#saveData-button')).nativeElement as HTMLButtonElement;

    expect(usernameInput.disabled).toBeFalsy();
    expect(emailInput.disabled).toBeFalsy();
    expect(saveButton).toBeTruthy();
  }));

  it('should handle saveData correctly', async () => {
    // given
    authState.setUser(userMock);
    component.ngOnInit(); // patch form
    const userChangeRequest = {
      id: userMock.id,
      username: "newUsername",
      email: userMock.email,
      password: "currentPassword",
    };
    const expectedUserReturn = {
      ...changedUserMock,
      ...userChangeRequest
    }
    jest.spyOn(accountService, 'saveUserData').mockResolvedValue(expectedUserReturn);
    jest.spyOn(authState, 'setUser');
    jest.spyOn(component.accountForm, 'patchValue');
    jest.spyOn(authService, 'logout').mockResolvedValue();
    component.accountForm.get('username')?.setValue('newUsername');
    component.accountForm.get('password')?.setValue('currentPassword');

    // when
    await ngZone.run( async () => component.saveData());


    // then
    expect(accountService.saveUserData).toHaveBeenCalledWith(userChangeRequest);

    expect(authService.logout).toHaveBeenCalled();
    expect(authState.setUser).not.toHaveBeenCalled();
    expect(component.accountForm.patchValue).not.toHaveBeenCalled();
  });

  it('should navigate to change password section', async () => {
    // given
    jest.spyOn(router, 'navigate');

    // when
    await ngZone.run(async () => component.changePw());

    // then
    expect(router.navigate).toHaveBeenCalledWith(['account/change-pw']);
  });

  it('should return false for dataHasChanged', fakeAsync(() =>  {
    authState.setUser(userMock);
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    changeButton.click();

    fixture.detectChanges();
    tick(100);

    const saveButton = debugElement.query(By.css('#saveData-button')).nativeElement as HTMLButtonElement;
    expect(component.dataHasChanged()).toBeFalsy();
    expect(saveButton.disabled).toBeTruthy();
  }));

  it('should return true for dataHasChanged', fakeAsync(() =>  {
    authState.setUser(userMock);
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    const usernameInput = debugElement.query(By.css('#change-username-input')).nativeElement as HTMLInputElement;
    const currentPassword = debugElement.query(By.css('#current-password-input')).nativeElement as HTMLInputElement;
    changeButton.click();

    usernameInput.value = 'newUsername';
    usernameInput.dispatchEvent(new Event('input'));
    currentPassword.value = 'currentPassword';
    currentPassword.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(100);

    const saveButton = debugElement.query(By.css('#saveData-button')).nativeElement as HTMLButtonElement;
    expect(component.dataHasChanged()).toBeTruthy();
    expect(saveButton.disabled).toBeFalsy();
  }));

  it('should show error password required for changes', fakeAsync(() =>  {
    authState.setUser(userMock);
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    const usernameInput = debugElement.query(By.css('#change-username-input')).nativeElement as HTMLInputElement;
    changeButton.click();

    usernameInput.value = 'newUsername';
    usernameInput.dispatchEvent(new Event('input'));
    usernameInput.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick(100);

    const passwordRequiredError = debugElement.query(By.css('#password-required-error')).nativeElement;
    const saveButton = debugElement.query(By.css('#saveData-button')).nativeElement as HTMLButtonElement;
    expect(component.dataHasChanged()).toBeTruthy();
    expect(saveButton.disabled).toBeTruthy();
    expect(passwordRequiredError.innerHTML).toContain("Password required to change data");
  }));

  it('should show data not changed error', fakeAsync(() =>  {
    authState.setUser(userMock);
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    const currentPassword = debugElement.query(By.css('#current-password-input')).nativeElement as HTMLInputElement;
    changeButton.click();

    currentPassword.value = 'currentPassword';
    currentPassword.dispatchEvent(new Event('input'));
    currentPassword.dispatchEvent(new Event('blur'));

    fixture.detectChanges();
    tick(100);

    const passwordRequiredError = debugElement.query(By.css('#data-not-changed-error')).nativeElement;
    const saveButton = debugElement.query(By.css('#saveData-button')).nativeElement as HTMLButtonElement;
    expect(component.dataHasChanged()).toBeFalsy();
    expect(saveButton.disabled).toBeTruthy();
    expect(passwordRequiredError.innerHTML).toContain("Data has not been changed");
  }));

  it('should cancel data change', fakeAsync(() =>  {
    authState.setUser(userMock);
    component.ngOnInit();

    const debugElement = fixture.debugElement;
    const changeButton = debugElement.query(By.css('#changeData-button')).nativeElement as HTMLButtonElement;
    const usernameInput = debugElement.query(By.css('#change-username-input')).nativeElement as HTMLInputElement;
    const emailInput = debugElement.query(By.css('#change-email-input')).nativeElement as HTMLInputElement;
    changeButton.click();

    usernameInput.value = 'newUsername';
    usernameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    tick(100);

    const cancelButton = debugElement.query(By.css('#cancel-button')).nativeElement as HTMLButtonElement;
    cancelButton.click();
    fixture.detectChanges();
    tick(100);

    expect(usernameInput.value).toEqual(userMock.username);
    expect(usernameInput.disabled).toBeTruthy();
    expect(emailInput.disabled).toBeTruthy();
  }));

  it('should patch user', async () => {
    // given
    await authState.setUser(userMock);
    const changedUser = {...userMock, email: "new-mail@dschungel.de"};
    const serviceSpy = jest.spyOn(authService, 'logout');
    const formSpy = jest.spyOn(component.accountForm, 'patchValue');
    const authStateSpy = jest.spyOn(authState, 'setUser').mockResolvedValue();

    // when
    await component.maybeLogoutOrSetUserState(changedUser);

    // then
    expect(serviceSpy).not.toHaveBeenCalled();
    expect(formSpy).toHaveBeenCalledWith(changedUser);
    expect(authStateSpy).toHaveBeenCalledWith(changedUser);
  });

  it('should call logout', async () => {
    const serviceSpy = jest.spyOn(authService, 'logout').mockResolvedValue();

    // when
    await component.logout();

    // then
    expect(serviceSpy).toHaveBeenCalled();
  });

});
