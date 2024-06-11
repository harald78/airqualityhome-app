import {TestBed} from '@angular/core/testing';

import { RegisterBaseService } from './register-base.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {availableSensorBaseMock} from "../../../../../mock/sensor-base.mock";
import {ToastService} from "../../../shared/components/toast/toast.service";
import {mdiAlert} from "@mdi/js";
import {AuthState} from "../../../core/auth/+state/auth.state";
import {userMock} from "../../../../../mock/user-mock";
import {activeRegisterRequest, canceledRegisterRequest} from "../../../../../mock/register-request.mock";

describe('RegisterBaseService', () => {
  let service: RegisterBaseService;
  let httpMock: HttpTestingController;
  let toastService: ToastService;
  let authState: AuthState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RegisterBaseService);
    httpMock = TestBed.inject(HttpTestingController);
    toastService = TestBed.inject(ToastService);
    authState = TestBed.inject(AuthState);
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch sensor bases', (done: jest.DoneCallback) => {
    service.getAvailableSensorBases().subscribe((base) => {
      expect(base).toEqual(availableSensorBaseMock);
      done();
    })

    const request = httpMock.expectOne('/api/app/register/sensorBase');
    expect(request.request.method).toBe('GET');
    request.flush(availableSensorBaseMock, {status: 200, statusText: "OK"});
  });

  it('should show error toast for request bases', done => {
    jest.spyOn(toastService, 'show');
    const expectedToast = {classname: "bg-danger text-light", header: 'Could not load available sensor bases',
      body: `403 FORBIDDEN`, icon: mdiAlert, iconColor: "white"};
    service.getAvailableSensorBases().subscribe(result =>
      {
        expect(result).toEqual([]);
        done();
      });

    const request = httpMock.expectOne('/api/app/register/sensorBase');
    expect(request.request.method).toBe('GET');
    request.flush({}, {status: 403, statusText: "FORBIDDEN"});
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });

  it('should get active requests for user', async () => {
    await authState.setUser(userMock);
    jest.spyOn(toastService, 'show');

    const promise = service.getActiveRegistrationsByUser();
    const request = httpMock.expectOne('/api/app/register/requests/1');
    expect(request.request.method).toBe('GET');
    request.flush(activeRegisterRequest, {status: 200, statusText: "OK"});

    const result = await promise;

    expect(result).toEqual(activeRegisterRequest);
    expect(toastService.show).not.toHaveBeenCalled();
  });

  it('should throw error on get active requests for user', async () => {
    await authState.setUser(userMock);
    const expectedToast = {classname: "bg-danger text-light", header: 'Could not load active registration requests',
      body: "403 FORBIDDEN", icon: mdiAlert, iconColor: "white"};
    jest.spyOn(toastService, 'show');

    const promise = service.getActiveRegistrationsByUser();
    const request = httpMock.expectOne('/api/app/register/requests/1');
    expect(request.request.method).toBe('GET');
    request.flush(activeRegisterRequest, {status: 403, statusText: "OK"});

    const result = await promise;

    expect(result).toBeUndefined();
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });

  it('should send register request', async () => {
    await authState.setUser(userMock);
    jest.spyOn(toastService, 'show');

    const registerRequest = {
      location: "Test Location",
      sensorBaseId: 1,
      userId: 1
    };
    const promise = service.sendRegisterRequest(registerRequest);
    const request = httpMock.expectOne('/api/app/register/sensor');
    expect(request.request.method).toBe('POST');
    request.flush(activeRegisterRequest, {status: 200, statusText: "OK"});

    const result = await promise;

    expect(result).toEqual(activeRegisterRequest);
    expect(toastService.show).not.toHaveBeenCalled();
  });

  it('should throw error on send register request', async () => {
    await authState.setUser(userMock);
    const registerRequest = {
      location: "Test Location",
      sensorBaseId: 1,
      userId: 1
    };
    const expectedToast = {classname: "bg-danger text-light", header: 'Could register sensor base',
      body: "403 FORBIDDEN", icon: mdiAlert, iconColor: "white"};
    jest.spyOn(toastService, 'show');

    const promise = service.sendRegisterRequest(registerRequest);
    const request = httpMock.expectOne('/api/app/register/sensor');
    expect(request.request.method).toBe('POST');
    request.flush(activeRegisterRequest, {status: 403, statusText: "OK"});

    const result = await promise;

    expect(result).toBeUndefined();
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });

  it('should send cancel register request', async () => {
    await authState.setUser(userMock);
    jest.spyOn(toastService, 'show');

    const registerRequest = {
      location: "Test Location",
      sensorBaseId: 1,
      userId: 1
    };
    const promise = service.cancelRegisterRequest(registerRequest);
    const request = httpMock.expectOne('/api/app/register/sensor/cancel');
    expect(request.request.method).toBe('POST');
    request.flush(canceledRegisterRequest, {status: 200, statusText: "OK"});

    const result = await promise;

    expect(result).toEqual(canceledRegisterRequest);
    expect(toastService.show).not.toHaveBeenCalled();
  });

  it('should throw error on cancel register request', async () => {
    await authState.setUser(userMock);
    const registerRequest = {
      location: "Test Location",
      sensorBaseId: 1,
      userId: 1
    };
    const expectedToast = {classname: "bg-danger text-light", header: 'Could register sensor base',
      body: "403 FORBIDDEN", icon: mdiAlert, iconColor: "white"};
    jest.spyOn(toastService, 'show');

    const promise = service.cancelRegisterRequest(registerRequest);
    const request = httpMock.expectOne('/api/app/register/sensor/cancel');
    expect(request.request.method).toBe('POST');
    request.flush(canceledRegisterRequest, {status: 403, statusText: "OK"});

    const result = await promise;

    expect(result).toBeUndefined();
    expect(toastService.show).toHaveBeenCalledWith(expectedToast);
  });


});
