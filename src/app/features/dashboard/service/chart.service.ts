import {Injectable} from '@angular/core';
import {ReferenceLine, SensorMeasurementHistory} from "../model/measurementHistory.model";
import {UnitPipe} from "../../../shared/pipes/unit.pipe";

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private unitPipe: UnitPipe) { }

  calculateYScaleMin(data: SensorMeasurementHistory[]): number {
    // TODO: Implement this method
    return 0;
  }

  calculateYScaleMax(data: SensorMeasurementHistory[]): number {
    // TODO: Implement this method
    return 40;
  }

  calculateReferenceLines(data: SensorMeasurementHistory[]): ReferenceLine[] {
    // TODO: Implement this method
    return [{name: "alarmMax", value: 30.0}, {name: "alarmMin", value: 18.0}];
  }

  formatYAxisTick(value: number, type: string): string {
    const unit = this.unitPipe.transform(type);
    return `${value} ${unit}`;
  }
}
