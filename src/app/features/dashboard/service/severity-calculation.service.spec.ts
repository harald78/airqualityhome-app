import { TestBed } from '@angular/core/testing';

import { SeverityCalculationService } from './severity-calculation.service';

describe('SeverityCalculationService', () => {
  let service: SeverityCalculationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeverityCalculationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
