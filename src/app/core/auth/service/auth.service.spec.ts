import {fakeAsync, TestBed, waitForAsync} from "@angular/core/testing";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {AuthService} from "./auth.service";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {userMock} from "../../../../../mock/user-mock";
import {ANONYMOUS_USER, AuthState} from "../+state/auth.state";
import { Router, RouterModule } from '@angular/router';
import {AuthRequestDto} from "../model/auth-request.model";
import {jwtDtoMock} from "../../../../../mock/jwt-dto.mock";
import {mdiAlert} from "@mdi/js";
import {HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { AppSettingsState, INITIAL_SETTINGS } from '../../app-settings/+state/app-settings.state';
import { APP_SETTINGS_KEY } from '../../app-settings/model/app-settings.model';
import { routesMock } from '../../../../../mock/routes.mock';


describe("AuthService Test", () => {
  let service: AuthService;
  let appState: AppSettingsState;
  let httpMock: HttpTestingController;
  let authState: AuthState;
  let router: Router;
  let toastService: ToastService;

  beforeEach(waitForAsync(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule.forRoot(routesMock)],
      providers: [ToastService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    authState = TestBed.inject(AuthState);
    appState = TestBed.inject(AppSettingsState);
    router = TestBed.inject(Router);
    toastService = TestBed.inject(ToastService);
  }));

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user and start refresh cycle', fakeAsync(async () => {
    const setUserSpy = jest.spyOn(authState, 'setUser').mockResolvedValue(undefined);
    const navigateSpy = jest.spyOn(router, 'navigate');
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();
    jest.useFakeTimers();

    const promise = service.loadUserProfile();
    const request = httpMock.expectOne(appState.baseUrl() + '/user/profile');
    request.flush(userMock, {status: 200, statusText: 'OK'});

    await promise;

    expect(setUserSpy).toHaveBeenCalledWith(userMock);
    expect(navigateSpy).not.toHaveBeenCalled(); // Das Setzen des Timeouts verzögert den Aufruf
  }));

  it('should login user without error', async () => {
    const loadingSpy = jest.spyOn(authState, 'loading');
    const navigateSpy = jest.spyOn(router, 'navigate');
    const loadProfileSpy = jest.spyOn(service, 'loadUserProfile').mockResolvedValue(undefined);
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(jwtDtoMock.token);
    Storage.prototype.getItem = jest.fn();

    const authRequest: AuthRequestDto = {
      username: 'test',
      password: 'any-password'
    };

    const promise = service.login(authRequest);
    const request = httpMock.expectOne(appState.baseUrl() + '/user/login');
    request.flush(jwtDtoMock, {status: 200, statusText: 'OK'});

    await promise;

    expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
    expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    expect(loadProfileSpy).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'access_token', jwtDtoMock.accessToken);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'token', jwtDtoMock.token);
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });

  it('should call login user and show error', async () => {
    const loadingSpy = jest.spyOn(authState, 'loading');
    const navigateSpy = jest.spyOn(router, 'navigate');
    const loadProfileSpy = jest.spyOn(service, 'loadUserProfile').mockResolvedValue(undefined);
    const toastServiceSpy = jest.spyOn(toastService, 'show');
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn();
    const expectedToast = {classname: "bg-danger text-light", header: '',
      id: 'login-error',
      body: "Username or Password not correct", icon: mdiAlert, iconColor: "white"};
    const expectedHttpError = new HttpErrorResponse({
      "error": {},
      "headers": new HttpHeaders(),
      "status": 403,
      "statusText": "NOT AUTHORIZED",
      "url": appState.baseUrl() + "/user/login"
    })

    const authRequest: AuthRequestDto = {
      username: 'test',
      password: 'any-password'
    };

    const promise = service.login(authRequest);
    const request = httpMock.expectOne(appState.baseUrl() + '/user/login');
    request.flush({}, {status: 403, statusText: 'NOT AUTHORIZED'});

    await expect(promise).rejects.toEqual(expectedHttpError);

    expect(loadingSpy).toHaveBeenNthCalledWith(1, true);
    expect(loadingSpy).toHaveBeenNthCalledWith(2, false);
    expect(toastServiceSpy).toHaveBeenCalledWith(expectedToast);
    expect(loadProfileSpy).toHaveBeenCalledTimes(0);
    expect(localStorage.setItem).not.toHaveBeenNthCalledWith(1, 'access_token', jwtDtoMock.accessToken);
    expect(localStorage.setItem).not.toHaveBeenNthCalledWith(2, 'token', jwtDtoMock.token);
    expect(localStorage.getItem).not.toHaveBeenCalledWith('token');
    expect(navigateSpy).not.toHaveBeenCalledWith(['']);
  });

  it('should fetch refresh token', fakeAsync(async () => {
    jest.spyOn(Storage.prototype, 'setItem');
    Storage.prototype.setItem = jest.fn();


    const promise = service.refreshToken(jwtDtoMock.token);
    const request = httpMock.expectOne(appState.baseUrl() + '/user/refreshToken');
    request.flush(jwtDtoMock, {status: 200, statusText: 'OK'});

    await promise;

    expect(localStorage.setItem).toHaveBeenNthCalledWith(1, 'access_token', jwtDtoMock.accessToken);
    expect(localStorage.setItem).toHaveBeenNthCalledWith(2, 'token', jwtDtoMock.token);
  }));

  it('should logout user', fakeAsync(async () => {
    jest.spyOn(Storage.prototype, 'removeItem');
    Storage.prototype.removeItem = jest.fn();
    const authStateSpy = jest.spyOn(authState, 'logout');
    const routerSpy = jest.spyOn(router, 'navigate').mockResolvedValue(true);
    jest.spyOn(service, 'serverLogout').mockResolvedValue(userMock);

    await service.logout();

    expect(localStorage.removeItem).toHaveBeenNthCalledWith(1, 'access_token');
    expect(localStorage.removeItem).toHaveBeenNthCalledWith(2, 'token');
    expect(authStateSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith(['login']);
  }));

  it('should set isLoading on authState', () => {
    const authStateSpy = jest.spyOn(authState, 'isLoading');

    service.isLoading();

    expect(authStateSpy).toHaveBeenCalled();
  });

  it('should call refreshToken', fakeAsync( async () => {
    const refreshTokenSpy = jest.spyOn(service, 'refreshToken').mockResolvedValue(undefined);
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'token') {
        return jwtDtoMock.token;
      }
      return null;
    });

    await service.tryRefresh();

    expect(refreshTokenSpy).toHaveBeenCalled();
  }));

  it('should not call refreshToken', fakeAsync( async () => {
    const refreshTokenSpy = jest.spyOn(service, 'refreshToken').mockResolvedValue(undefined);
    const logoutSpy = jest.spyOn(service, 'logout').mockResolvedValue();

    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === APP_SETTINGS_KEY) {
        return JSON.stringify(INITIAL_SETTINGS);
      }
      return null;
    });

    await expect( () => service.tryRefresh()).rejects.toEqual("Could not refresh token");
    expect(refreshTokenSpy).not.toHaveBeenCalled();
    expect(logoutSpy).toHaveBeenCalled();
  }));

  it('should setRefreshTimeout', fakeAsync(async () => {
    jest.spyOn(Storage.prototype, 'getItem');
    Storage.prototype.getItem = jest.fn((key) => {
      if (key === 'token') {
        return jwtDtoMock.token;
      }
      return null;
    });
    const refreshTokenSpy = jest.spyOn(service, 'refreshToken').mockResolvedValue(undefined);
    jest.useFakeTimers();

    await service.setRefreshTimeout();
    expect(refreshTokenSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(270000);
    expect(refreshTokenSpy).toHaveBeenCalled();
  }));

  it('should navigate to general settings', async () => {
    // when
    const routerSpy = jest.spyOn(router, 'navigate');
    await service.showSettings();

    // then
    expect(routerSpy).toHaveBeenCalledWith(['general-settings']);
  });

  it('should handle error on logout user', async () => {
    const promise = service.serverLogout();
    const request = httpMock.expectOne(appState.baseUrl() + '/user/logout');
    request.flush(userMock, {status: 500, statusText: 'INTERNAL SERVER ERROR'});

    await expect(promise).resolves.toEqual(ANONYMOUS_USER);
  });

  it('should unsubscribe from intervalSubscription', () => {
    service.setRefreshTimeout();
    const subscriptionSpy = jest.spyOn(service.intervalSubscription, 'unsubscribe');
    const serverLogoutSpy = jest.spyOn(service, 'serverLogout');

    service.logUserOut();

    expect(subscriptionSpy).toHaveBeenCalled();
    expect(serverLogoutSpy).toHaveBeenCalled();
  });

});
