import { Pipe, PipeTransform } from '@angular/core';
import {PhysicalType, SensorType} from "../model/sensor-type.model";

@Pipe({
  name: 'unit',
  standalone: true
})
export class UnitPipe implements PipeTransform {

  transform(type: string): string {
    switch (type) {
      case PhysicalType.TEMPERATURE:
        return '°C';
      case PhysicalType.PARTICLE:
      case PhysicalType.VOC:
      case PhysicalType.H2:
      case PhysicalType.CO:
      case PhysicalType.LPG:
      case PhysicalType.ALCOHOL:
      case PhysicalType.PROPANE:
        return 'ppm';
      case PhysicalType.HUMIDITY:
        return '%';
      case PhysicalType.LIGHT:
        return 'lx';
      case PhysicalType.PRESSURE:
        return 'hPa';
      default:
        return '';
    }
  }

}
