import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeverityCalculationService {


  constructor() { }

  getSeverity(warningThreshold: number, value: number, minAlarm: number, maxAlarm: number) {
    if (this.checkDangerAlarm(value, minAlarm, maxAlarm)) {
      return 'danger';
    }

    if (this.checkWarningAlarm(value, minAlarm, maxAlarm, warningThreshold)) {
      return 'warning';
    }
    return 'success';
  }

  private checkDangerAlarm(value: number, minAlarm: number, maxAlarm: number): boolean {
    return value <= minAlarm || value >= maxAlarm;
  }

  private checkWarningAlarm(value: number, minAlarm: number, maxAlarm: number, threshold: number): boolean {
    return value <= minAlarm + threshold || value >= maxAlarm - threshold;
  }


}
