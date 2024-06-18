import { TestBed } from '@angular/core/testing';

import { SensorSettingsService } from './sensor-settings.service';

describe('SensorSettingsService', () => {
  let service: SensorSettingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensorSettingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
