import {BaseEntity} from "./filter.model";

export interface LatestMeasurement extends BaseEntity{
  uuid: string;
  sensorBaseName: string;
  sensorName: string;
  sensorType: string;
  location: string;
  alarmMax: number;
  alarmMin: number;
  timestamp: Date;
  unit: string;
  value: number;
  warningThreshold: number;
  linearCorrectionValue: number;
  alarmActive: boolean;
}
