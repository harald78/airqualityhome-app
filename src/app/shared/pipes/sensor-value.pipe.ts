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
        return value.toFixed(0);
      default:
        return value.toFixed(2);
    }
  }

}
