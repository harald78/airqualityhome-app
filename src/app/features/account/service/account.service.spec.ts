import { TestBed } from '@angular/core/testing';

import { AccountService } from './account.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastService } from '../../../shared/components/toast/toast.service';
import { ErrorResponseService } from '../../../shared/services/error-response.service';
import { AuthState } from '../../../core/auth/+state/auth.state';
import { OverlayService } from '../../../shared/services/overlay.service';
import { changedUserMock, userMock } from '../../../../../mock/user-mock';
import { mdiAlert, mdiCheck } from '@mdi/js';
import { AppSettingsState } from '../../../core/app-settings/+state/app-settings.state';

describe('AccountService', () => {
  let service: AccountService;
  let appState: AppSettingsState;
  let httpMock: HttpTestingController;
  let toastService: ToastService;
  let errorStatusService: ErrorResponseService;
  let authState: AuthState;
  let overlayService: OverlayService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AccountService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
    errorStatusService = TestBed.inject(ErrorResponseService);
    overlayService = TestBed.inject(OverlayService);
    appState = TestBed.inject(AppSettingsState);
    authState = TestBed.inject(AuthState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send UserChangeRequest successfully', async () => {
    const userChangeRequest = {
      id: 1,
      username: 'Balu',
      email: 'balu@gmail.com',
      password: '123456',
    };
    const overlayShowSpy = jest.spyOn(overlayService, 'show');
    const overlayHideSpy = jest.spyOn(overlayService, 'hide');
    const toastSpy = jest.spyOn(toastService, 'show');
    const expectedUrl = appState.baseUrl() + '/user/save';
    const expectedToast = {classname: "bg-success text-light", header: '',
      body: "Saved changes successfully", icon: mdiCheck, iconColor: "white"};

    const promise = service.saveUserData(userChangeRequest);
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('POST');
    request.flush(userMock, { status: 200, statusText: "OK" });

    const result = await promise;

    expect(overlayShowSpy).toHaveBeenCalledTimes(1);
    expect(overlayHideSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userMock);
    expect(toastSpy).toHaveBeenCalledWith(expectedToast);
  });

  it('should handle error UserChangeRequest correctly', async () => {
    const userChangeRequest = {
      id: 1,
      username: 'Balu',
      email: 'balu@gmail.com',
      password: '123456',
    };
    await authState.setUser(changedUserMock);
    const overlayShowSpy = jest.spyOn(overlayService, 'show');
    const overlayHideSpy = jest.spyOn(overlayService, 'hide');
    const toastSpy = jest.spyOn(toastService, 'show');
    const errorStatusSpy = jest.spyOn(errorStatusService, 'getHttpErrorResponseTextByStatus');
    const expectedUrl = appState.baseUrl() + '/user/save';
    const expectedToast = {classname: "bg-danger text-light", header: 'Could not save user data',
      body: "403 FORBIDDEN", icon: mdiAlert, iconColor: "white"};

    const promise = service.saveUserData(userChangeRequest);
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('POST');
    request.flush(userMock, { status: 403, statusText: "OK" });

    const result = await promise;

    expect(overlayShowSpy).toHaveBeenCalledTimes(1);
    expect(overlayHideSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(changedUserMock);
    expect(toastSpy).toHaveBeenCalledWith(expectedToast);
    expect(errorStatusSpy).toHaveBeenCalledWith(403);
  });

  it('should send PasswordChangeRequest successfully', async () => {
    const passwordChangeRequest = {
      id: 1,
      username: 'Balu',
      password: 'secret-password',
      oldPassword: "987"
    };
    const overlayShowSpy = jest.spyOn(overlayService, 'show');
    const overlayHideSpy = jest.spyOn(overlayService, 'hide');
    const toastSpy = jest.spyOn(toastService, 'show');
    const expectedUrl = appState.baseUrl() + '/user/save-password';
    const expectedSuccessToast = {classname: "bg-success text-light", header: '',
      body: "Password changed successfully", icon: mdiCheck, iconColor: "white"};


    const promise = service.savePassword(passwordChangeRequest);
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('POST');
    request.flush(userMock, { status: 200, statusText: "OK" });

    const result = await promise;

    expect(overlayShowSpy).toHaveBeenCalledTimes(1);
    expect(overlayHideSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userMock);
    expect(toastSpy).toHaveBeenCalledWith(expectedSuccessToast);
  });

  it('should handle error PasswordChangeRequest correctly', async () => {
    const passwordChangeRequest = {
      id: 1,
      username: 'Balu',
      password: 'secret-password',
      oldPassword: 'not-so-secret'
    };
    authState.setUser(userMock);
    const overlayShowSpy = jest.spyOn(overlayService, 'show');
    const overlayHideSpy = jest.spyOn(overlayService, 'hide');
    const toastSpy = jest.spyOn(toastService, 'show');
    const expectedUrl = appState.baseUrl() + '/user/save-password';
    const errorStatusSpy = jest.spyOn(errorStatusService, 'getHttpErrorResponseTextByStatus');
    const expectedToast = {classname: "bg-danger text-light", header: 'Password could not be changed',
      body: "403 FORBIDDEN", icon: mdiAlert, iconColor: "white"};

    const promise = service.savePassword(passwordChangeRequest);
    const request = httpMock.expectOne(expectedUrl);
    expect(request.request.method).toBe('POST');
    request.flush(userMock, { status: 403, statusText: "OK" });

    const result = await promise;

    expect(overlayShowSpy).toHaveBeenCalledTimes(1);
    expect(overlayHideSpy).toHaveBeenCalledTimes(1);
    expect(result).toEqual(userMock);
    expect(toastSpy).toHaveBeenCalledWith(expectedToast);
    expect(errorStatusSpy).toHaveBeenCalledWith(403);
  });
});
