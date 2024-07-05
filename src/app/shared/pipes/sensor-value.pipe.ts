import { Pipe, PipeTransform } from '@angular/core';
import {PhysicalType} from "../model/sensor-type.model";

@Pipe({
  name: 'sensorValue',
  standalone: true
})
export class SensorValuePipe implements PipeTransform {

  transform(value: number, type: string): string {
    switch (type) {
      case PhysicalType.VOC:
        return value ? value.toFixed(0): '0';
      default:
        return this.checkNumberSizeAndReduceFixed(value);
    }
  }

  checkNumberSizeAndReduceFixed(value: number): string {
    if (!value) {
      return '0'
    }

    if (value > 99999) {
      return value.toFixed(0);
    } else if (value > 10000) {
      return value.toFixed(1);
    }
    return value.toFixed(2);
  }

}
