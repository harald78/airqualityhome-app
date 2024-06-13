import { TestBed } from '@angular/core/testing';

import { ChartService } from './chart.service';
import { UnitPipe } from '../../../shared/pipes/unit.pipe';

describe('ChartService', () => {
  let service: ChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnitPipe]
    });
    service = TestBed.inject(ChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
