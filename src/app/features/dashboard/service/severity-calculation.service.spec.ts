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

  describe('getSeverity', () => {
    it('should return danger when value is less than minAlarm', () => {
      expect(service.getSeverity(2, 4, 10, 20)).toBe('danger');
    });

    it('should return danger when value is greater than maxAlarm', () => {
      expect(service.getSeverity(2, 21, 10, 20)).toBe('danger');
    });

    it('should return warning when value is within warningThreshold of minAlarm', () => {
      expect(service.getSeverity(2, 12, 10, 20)).toBe('warning');
    });

    it('should return warning when value is within warningThreshold of maxAlarm', () => {
      expect(service.getSeverity(2, 18, 10, 20)).toBe('warning');
    });

    it('should return success when value is within range and outside warningThreshold', () => {
      expect(service.getSeverity(2, 13, 10, 20)).toBe('success');
    });
  });

  describe('checkDangerAlarm', () => {
    it('should return true when value is less than or equal to minAlarm', () => {
      expect(service['checkDangerAlarm'](10, 10, 20)).toBeTruthy();
      expect(service['checkDangerAlarm'](9, 10, 20)).toBeTruthy();
    });

    it('should return true when value is greater than or equal to maxAlarm', () => {
      expect(service['checkDangerAlarm'](20, 10, 20)).toBeTruthy();
      expect(service['checkDangerAlarm'](21, 10, 20)).toBeTruthy();
    });

    it('should return false when value is between minAlarm and maxAlarm', () => {
      expect(service['checkDangerAlarm'](15, 10, 20)).toBeFalsy();
    });
  });

  describe('checkWarningAlarm', () => {
    it('should return true when value is within threshold of minAlarm', () => {
      expect(service['checkWarningAlarm'](11, 10, 20, 2)).toBeTruthy();
    });

    it('should return true when value is within threshold of maxAlarm', () => {
      expect(service['checkWarningAlarm'](19, 10, 20, 2)).toBeTruthy();
    });

    it('should return false when value is outside threshold of minAlarm and maxAlarm', () => {
      expect(service['checkWarningAlarm'](15, 10, 20, 2)).toBeFalsy();
    });
  });
});
