import { Pipe, PipeTransform } from '@angular/core';
import {PhysicalType, SensorType} from "../model/sensor-type.model";

@Pipe({
  name: 'unit',
  standalone: true
})
export class UnitPipe implements PipeTransform {

  transform(sensorType: SensorType): unknown {
    switch (sensorType.type) {
      case PhysicalType.TEMPERATURE:
        return '°C';
      case PhysicalType.PARTICLE:
      case PhysicalType.GAS:
        return 'ppm';
      case PhysicalType.HUMIDITY:
        return '%';
      case PhysicalType.LIGHT:
        return 'cd';
      case PhysicalType.PRESSURE:
        return 'mbar';
      default:
        return '';
    }
  }

}
