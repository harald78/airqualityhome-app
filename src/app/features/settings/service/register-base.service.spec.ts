import {TestBed} from '@angular/core/testing';

import { RegisterBaseService } from './register-base.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {availableSensorBaseMock} from "../../../../../mock/sensor-base.mock";

describe('RegisterBaseService', () => {
  let service: RegisterBaseService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(RegisterBaseService);
    httpMock = TestBed.inject(HttpTestingController);
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

    const request = httpMock.expectOne('/api/register/sensorBase');

    request.flush(availableSensorBaseMock, {status: 200, statusText: "OK"});
  });
});
