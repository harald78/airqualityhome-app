import {Injectable} from '@angular/core';
import {SensorMeasurementHistory} from "../model/measurementHistory.model";
import {UnitPipe} from "../../../shared/pipes/unit.pipe";
import { DateTimeUtil } from '../../../shared/util/date.util';
import { ReferenceLine } from '../model/chart.models';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private unitPipe: UnitPipe) { }

  calculateYScaleMin(data: SensorMeasurementHistory[]): number {
    let min = 0;
    if (data && data.length > 0 && data[0].series?.length > 0) {
      min = data[0].series[0].value;
      data.forEach(d => {
        min = d.minAlarm < min ? d.minAlarm : min;
        d.series.forEach(s => {
          if (s.value < min) {
            min = s.value;
          }
        });
      });
    }
    return min;
  }

  calculateYScaleMax(data: SensorMeasurementHistory[]): number {
    let max = 0;
    if (data && data.length > 0 && data[0].series?.length > 0) {
      max = data[0].series[0].value;
      data.forEach(d => {
        max = d.maxAlarm > max ? d.maxAlarm : max;
        d.series.forEach(s => {
          if (s.value > max) {
            max = s.value;
          }
        });
      });
    }
    return max;
  }

  calculateReferenceLines(data: SensorMeasurementHistory[]): ReferenceLine[] {
    const referenceLines: ReferenceLine[] = [];

    data.forEach(d => {
      if (d.minAlarm !== 0 || d.maxAlarm !== 0) {
        referenceLines.push({name: "min " + this.unitPipe.transform(d.type), value: d.minAlarm});
        referenceLines.push({name: "max " + this.unitPipe.transform(d.type), value: d.maxAlarm})
      }
    });

    return referenceLines;
  }

  formatYAxisTick(value: number, type: string): string {
    const unit = this.unitPipe.transform(type);
    return `${value} ${unit}`;
  }

  formatXAxisTick(value: Date) {
    return DateTimeUtil.getFormattedTimeString(value);
  }
}
