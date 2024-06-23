import {SensorType} from "../../../shared/model/sensor-type.model";

export interface SensorBase {
  id: number;
  name: string;
  sensorTypes: SensorType[];
}

export interface SensorRange {
  minAlarm: number;
  maxAlarm: number;
  alarmType: string;
}

export interface SensorTypeGroup {
  name: string;
  types: string[];
  sensorRanges: SensorRange[];
}
