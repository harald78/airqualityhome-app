import {PhysicalType} from "../../../shared/model/sensor-type.model";

export interface Sensor {
  id: number;
  uuid: string;
  sensorBase: string;
  sensorType: PhysicalType;
  sensorName: string;
  sensorBaseSensorTypeId: number;
  userId: number
  location: string;
  alarmMin: number;
  alarmMax: number;
  alarmActive: boolean;
  warningThreshold: number;
  linearCorrectionValue: number;
  updated: Date,
  created: Date
}
