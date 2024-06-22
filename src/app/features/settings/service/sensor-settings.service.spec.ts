import { TestBed } from '@angular/core/testing';

import { SensorSettingsService } from './sensor-settings.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SensorSettingsService', () => {
  let service: SensorSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SensorSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
