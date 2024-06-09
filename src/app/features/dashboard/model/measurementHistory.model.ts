import {PhysicalType} from "../../../shared/model/sensor-type.model";

export interface MeasurementHistory {
  baseId: number;
  baseName: string;
  data: SensorMeasurementHistory[];
}

export interface SensorMeasurementHistory {
  type: PhysicalType;
  sensorName: string;
  name: string;
  minAlarm: number;
  maxAlarm: number;
  sensorMinValue: number;
  sensorMaxValue: number;
  series: MeasurementHistorySeries[];
}

export interface MeasurementHistorySeries{
  value: number;
  name: Date;
}

export interface ReferenceLine {
  name: string;
  value: number;
}
